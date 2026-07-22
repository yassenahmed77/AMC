import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import OrderCard from './OrderCard';
import { ShoppingCart, RefreshCw, Search, X } from 'lucide-react';
import toast from 'react-hot-toast';

function OrdersList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'pending', 'confirmed', 'cancelled'
    const [searchQuery, setSearchQuery] = useState('');
    const [actionLoadingId, setActionLoadingId] = useState(null);

    async function fetchOrders() {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (err) {
            toast.error(err.message || 'Failed to fetch orders.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const triggerConfirmToast = (message, onConfirm) => {
        toast((t) => (
            <div className="flex flex-col gap-3 p-1 text-left">
                <p className="text-sm font-bold text-slate-800 leading-relaxed">{message}</p>
                <div className="flex justify-end gap-2">
                    <button 
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                        Discard
                    </button>
                    <button 
                        onClick={() => {
                            toast.dismiss(t.id);
                            onConfirm();
                        }}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-black bg-maincolor text-white shadow-sm hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        ), {
            duration: 8000,
            position: 'top-center'
        });
    };

    const handleConfirmOrder = async (orderId) => {
        setActionLoadingId(orderId);
        try {
            // Call the atomic stored procedure to confirm order and decrement stock
            const { error } = await supabase.rpc('confirm_order_and_decrement_stock', {
                p_order_id: orderId
            });

            if (error) throw error;

            toast.success('Order confirmed and stock updated successfully!');
            fetchOrders();
        } catch (err) {
            toast.error(err.message || 'Failed to confirm order.');
        } finally {
            setActionLoadingId(null);
        }
    };

    const handleCancelOrder = async (orderId) => {
        setActionLoadingId(orderId);
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: 'cancelled' })
                .eq('id', orderId);

            if (error) throw error;

            toast.success('Order cancelled successfully.');
            fetchOrders();
        } catch (err) {
            toast.error(err.message || 'Failed to cancel order.');
        } finally {
            setActionLoadingId(null);
        }
    };

    const requestConfirmOrder = (orderId) => {
        triggerConfirmToast(
            'Are you sure you want to confirm this order and decrement product stock?',
            () => handleConfirmOrder(orderId)
        );
    };

    const requestCancelOrder = (orderId) => {
        triggerConfirmToast(
            'Are you sure you want to cancel this order?',
            () => handleCancelOrder(orderId)
        );
    };

    // Robust, multi-field, symbol-cleansed search filter
    const filteredOrders = orders.filter(order => {
        const matchesStatus = filter === 'all' || order.status === filter;
        
        const rawQ = searchQuery.toLowerCase().trim();
        if (!rawQ) return matchesStatus;

        // Clean alphanumeric query (strips #, -, spaces for flexible Order ID / Phone matching)
        const cleanQ = rawQ.replace(/[^a-z0-9]/gi, '');

        const orderNumRaw = String(order.order_number ?? '').toLowerCase();
        const orderNumClean = orderNumRaw.replace(/[^a-z0-9]/gi, '');

        const orderIdRaw = String(order.id ?? '').toLowerCase();
        const orderIdClean = orderIdRaw.replace(/[^a-z0-9]/gi, '');

        const customerName = String(order.customer_name ?? '').toLowerCase();
        const customerPhoneRaw = String(order.customer_phone ?? '').toLowerCase();
        const customerPhoneClean = customerPhoneRaw.replace(/[^0-9]/g, '');

        const clinicName = String(order.clinic_name ?? '').toLowerCase();
        const governorate = String(order.customer_governorate ?? '').toLowerCase();
        const address = String(order.customer_address ?? '').toLowerCase();
        const itemsText = JSON.stringify(order.items ?? []).toLowerCase();

        const matchesQuery = (
            (cleanQ && orderNumClean.includes(cleanQ)) ||
            (cleanQ && orderIdClean.includes(cleanQ)) ||
            orderNumRaw.includes(rawQ) ||
            orderIdRaw.includes(rawQ) ||
            customerName.includes(rawQ) ||
            customerPhoneRaw.includes(rawQ) ||
            (cleanQ && customerPhoneClean.includes(cleanQ)) ||
            clinicName.includes(rawQ) ||
            governorate.includes(rawQ) ||
            address.includes(rawQ) ||
            itemsText.includes(rawQ)
        );

        return matchesStatus && matchesQuery;
    });

    return (
        <div>
            {/* Header controls inside list */}
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center text-center sm:text-left border-b border-slate-200 pb-6 mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Incoming Orders</h2>
                    <p className="text-slate-500 text-sm mt-1">Verify patient/institution details, make confirmation phone call, and allocate inventory</p>
                </div>
                <button 
                    onClick={fetchOrders}
                    className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 active:scale-95 transition-all cursor-pointer w-full sm:w-auto"
                >
                    <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                    <span>Refresh Orders</span>
                </button>
            </div>

            {/* Filter Tabs & Search Bar Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                {/* Search Box */}
                <div className="relative max-w-md w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by Order #, ID, Customer, Phone, or Product..."
                        className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-maincolor shadow-sm transition-all"
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                {/* Status Filter Tabs */}
                <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl text-center shrink-0">
                    {['all', 'pending', 'confirmed', 'cancelled'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                                filter === tab
                                    ? 'bg-white text-maincolor shadow-sm'
                                    : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            {tab} ({orders.filter(o => tab === 'all' ? true : o.status === tab).length})
                        </button>
                    ))}
                </div>
            </div>

            {/* Content List */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <RefreshCw className="w-10 h-10 text-maincolor animate-spin mb-4" />
                    <p className="text-slate-500 font-bold text-sm">Loading orders list...</p>
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl p-8 max-w-md mx-auto shadow-sm">
                    <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-800 mb-1">No Orders Found</h3>
                    <p className="text-slate-500 text-sm">
                        {searchQuery ? `No orders found matching "${searchQuery}".` : "No orders matching the current filter were found."}
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {filteredOrders.map((order) => (
                        <OrderCard 
                            key={order.id}
                            order={order}
                            actionLoadingId={actionLoadingId}
                            onRequestConfirm={requestConfirmOrder}
                            onRequestCancel={requestCancelOrder}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrdersList;
