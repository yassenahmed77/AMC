/**
 * Service to send instant Telegram notifications to the store owner on new order checkout.
 */
export async function sendOrderNotificationToTelegram(orderData) {
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatIdEnv = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    // Warning if credentials are not set yet
    if (!botToken || !chatIdEnv) {
        console.warn('Telegram notification skipped: Missing bot token or chat ID environment variables.');
        return;
    }

    // Split chat IDs by comma to support multiple recipients
    const chatIds = chatIdEnv.split(',').map(id => id.trim()).filter(Boolean);
    if (chatIds.length === 0) return;

    try {
        const { order_number, customer_name, customer_phone, customer_governorate, customer_address, clinic_name, items, total_price } = orderData;

        // Format items list
        const itemsText = items && Array.isArray(items)
            ? items.map(item => `• *${item.name}* (x${item.quantity}) - ${item.price ? `${(item.price * item.quantity).toLocaleString()} EGP` : 'Quote'}`).join('\n')
            : 'No items listed';

        // Construct Markdown formatted message
        const message = `🚨 *NEW ORDER RECEIVED!* 🚨\n\n` +
            `📦 *Order Number:* #${order_number}\n` +
            `👤 *Customer Name:* ${customer_name}\n` +
            `📞 *Phone Number:* ${customer_phone}\n` +
            (clinic_name ? `🏥 *Clinic/Hospital:* ${clinic_name}\n` : '') +
            `📍 *Governorate:* ${customer_governorate}\n` +
            `🏡 *Address:* ${customer_address}\n\n` +
            `🛒 *Order Items:*\n${itemsText}\n\n` +
            `💰 *Subtotal:* ${total_price ? `${total_price.toLocaleString()} EGP` : 'Quote'}\n\n` +
            `⚠️ *Action Required:* Please open the Dashboard to review customer details, calculate shipping fees, and confirm this order!\n\n` +
            `🔗 [Click Here to Confirm Order](${window.location.origin}/admin)`;

        // Send to all chat IDs in parallel
        const sendPromises = chatIds.map(chatId =>
            fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'Markdown',
                    disable_web_page_preview: false
                })
            }).then(async res => {
                const resData = await res.json();
                if (!resData.ok) {
                    console.error(`Telegram API error for chat_id (${chatId}):`, resData);
                }
            })
        );

        await Promise.all(sendPromises);
    } catch (err) {
        console.error('Telegram notification error:', err);
    }
}
