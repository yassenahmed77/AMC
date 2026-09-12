import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { X, CheckCircle2, DollarSign, Calculator, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

function EditOrderPriceModal({ order, isOpen, onClose, onSaveSuccess }) {
    const [itemPrices, setItemPrices] = useState({});
    const [totalPrice, setTotalPrice] = useState('');
    const [isCustomTotal, setIsCustomTotal] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (order && order.items) {
            const initialPrices = {};
            let sum = 0;
            
            order.items.forEach((item, idx) => {
                const currentPrice = item.price || '';
                initialPrices[idx] = currentPrice;
                if (item.price) {
                    sum += Number(item.price) * Number(item.quantity || 1);
                }
            });

            setItemPrices(initialPrices);
            
            if (order.total_price) {
                setTotalPrice(order.total_price);
                setIsCustomTotal(true);
            } else {
                setTotalPrice(sum > 0 ? sum : '');
                setIsCustomTotal(false);
            }
        }
    }, [order]);

    if (!isOpen || !order) return null;

    // Recalculate sum whenever itemPrices change (unless user manually entered a custom total)
    const handlePriceChange = (index, value) => {
        const updated = { ...itemPrices, [index]: value };
        setItemPrices(updated);

        if (!isCustomTotal) {
            let sum = 0;
            order.items.forEach((item, idx) => {
                const p = Number(updated[idx]) || 0;
                const q = Number(item.quantity) || 1;
                sum += p * q;
            });
            setTotalPrice(sum > 0 ? sum : '');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Build updated items array
            const updatedItems = order.items.map((item, idx) => {
                const unitPrice = itemPrices[idx] !== '' && itemPrices[idx] !== null && !isNaN(itemPrices[idx])
                    ? Number(itemPrices[idx])
                    : null;
                
                return {
                    ...item,
                    price: unitPrice
                };
            });

            // Calculate final total
            const finalTotal = totalPrice !== '' && !isNaN(totalPrice) ? Number(totalPrice) : null;

            // Update order record in Supabase
            const { error: updateErr } = await supabase
                .from('orders')
                .update({
                    items: updatedItems,
                    total_price: finalTotal,
                    status: 'confirmed'
                })
                .eq('id', order.id);

            if (updateErr) throw updateErr;

            // Optional RPC to attempt stock decrement if order was pending
            if (order.status === 'pending') {
                try {
                    await supabase.rpc('confirm_order_and_decrement_stock', {
                        p_order_id: order.id
                    });
                } catch (rpcErr) {
                    // Ignore if RPC already handled status or doesn't exist
                }
            }

            toast.success('Order confirmed & agreed prices saved successfully!');
            if (onSaveSuccess) onSaveSuccess();
            onClose();
        } catch (err) {
            toast.error(err.message || 'Failed to update order prices.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-slate-900/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
                
                {/* Modal Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
                    <div>
                        <span className="text-xs font-black bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                            Order #{order.order_number}
                        </span>
                        <h2 className="text-xl font-black text-white uppercase tracking-tight mt-1.5">
                            {order.status === 'confirmed' ? 'Edit Agreed Prices' : 'Set Prices & Confirm Order'}
                        </h2>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="w-9 h-9 rounded-full bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSave} className="p-6 overflow-y-auto flex-grow flex flex-col gap-6 custom-scrollbar">
                    
                    {/* Customer Info Box */}
                    <div className="bg-slate-950/70 border border-white/10 rounded-2xl p-4 flex flex-col gap-1 text-xs">
                        <span className="font-bold text-white uppercase">Customer: {order.customer_name}</span>
                        <span className="text-slate-300 font-medium">Phone: {order.customer_phone}</span>
                        <span className="text-slate-300 font-medium">Gov: {order.customer_governorate}</span>
                    </div>

                    {/* Ordered Items Prices Form */}
                    <div className="flex flex-col gap-4">
                        <label className="text-xs font-extrabold text-slate-300 uppercase flex items-center gap-1.5">
                            <Tag size={14} className="text-cyan-400" />
                            Items Unit Prices (EGP)
                        </label>

                        <div className="flex flex-col gap-3">
                            {order.items?.map((item, idx) => {
                                const unitPrice = Number(itemPrices[idx]) || 0;
                                const qty = Number(item.quantity) || 1;
                                const subtotal = unitPrice * qty;

                                return (
                                    <div key={idx} className="p-3.5 bg-slate-950/60 rounded-2xl border border-white/10 flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <span className="font-extrabold text-white text-xs uppercase truncate max-w-[200px]">
                                                {item.name}
                                            </span>
                                            <span className="text-xs font-black text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-white/10">
                                                Qty: {qty}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 mt-1">
                                            <div className="relative flex-grow">
                                                <input 
                                                    type="number"
                                                    min="0"
                                                    step="any"
                                                    value={itemPrices[idx] ?? ''}
                                                    onChange={(e) => handlePriceChange(idx, e.target.value)}
                                                    placeholder="Agreed Price (EGP)"
                                                    className="w-full px-3 py-2 bg-slate-900 rounded-xl border border-white/15 text-xs font-bold text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                                                />
                                                <span className="absolute right-3 top-2 text-[10px] font-bold text-slate-500">EGP</span>
                                            </div>

                                            <div className="text-right shrink-0 min-w-[70px]">
                                                <span className="text-[10px] text-slate-500 font-semibold block">Total</span>
                                                <span className="text-xs font-extrabold text-cyan-400 font-mono">
                                                    {subtotal > 0 ? `${subtotal.toLocaleString()} EGP` : '0 EGP'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Total Agreed Order Value */}
                    <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                        <label className="text-xs font-extrabold text-slate-300 uppercase flex items-center gap-1.5">
                            <Calculator size={14} className="text-cyan-400" />
                            Final Total Order Price (EGP)
                        </label>

                        <div className="relative">
                            <input 
                                type="number"
                                min="0"
                                step="any"
                                value={totalPrice}
                                onChange={(e) => {
                                    setTotalPrice(e.target.value);
                                    setIsCustomTotal(true);
                                }}
                                placeholder="Total Order Value"
                                className="w-full px-4 py-3 bg-slate-950/90 rounded-xl border border-cyan-500/40 text-sm font-black text-cyan-300 focus:outline-none focus:border-cyan-400 font-mono"
                            />
                            <span className="absolute right-4 top-3.5 text-xs font-extrabold text-cyan-400 font-mono">EGP</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold">
                            * Auto-calculated sum of item prices. You can also type an overall custom total if a discount was given.
                        </span>
                    </div>

                    {/* Modal Actions */}
                    <div className="flex gap-3 pt-4 border-t border-white/10">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl border border-white/15 text-slate-300 text-xs font-bold hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            <CheckCircle2 size={16} />
                            {saving ? 'Saving...' : order.status === 'confirmed' ? 'Save Prices' : 'Save & Confirm Order'}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}

export default EditOrderPriceModal;
