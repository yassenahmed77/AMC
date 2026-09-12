import { Clock, CheckCircle2, XCircle, User, Phone, Building2, MapPin } from 'lucide-react';

function OrderCard({ order, actionLoadingId, onRequestConfirm, onRequestCancel, onOpenPriceModal }) {
    const isProcessing = actionLoadingId === order.id;

    return (
        <div 
            className={`bg-slate-900/75 backdrop-blur-xl rounded-3xl border p-6 sm:p-8 shadow-xl transition-all duration-300 ease-out flex flex-col lg:flex-row gap-8 ${
                order.status === 'pending' 
                    ? 'border-amber-500/30 hover:border-amber-500/50 bg-slate-900/85' 
                    : order.status === 'confirmed'
                    ? 'border-cyan-500/30 hover:border-cyan-500/50 bg-slate-900/85'
                    : 'border-white/10 hover:border-white/20 bg-slate-900/60'
            }`}
        >
            {/* Client Info Section */}
            <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xs bg-slate-950 text-cyan-400 border border-white/15 px-2.5 py-0.5 rounded-lg font-black font-mono">#{order.order_number}</span>
                        <span className="text-xs text-slate-400 font-bold">
                            {new Date(order.created_at).toLocaleString('en-US', {
                                dateStyle: 'medium',
                                timeStyle: 'short'
                            })}
                        </span>
                    </div>

                    {/* Status Badge */}
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                        order.status === 'pending'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : order.status === 'confirmed'
                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    }`}>
                        {order.status === 'pending' && <Clock size={12} />}
                        {order.status === 'confirmed' && <CheckCircle2 size={12} />}
                        {order.status === 'cancelled' && <XCircle size={12} />}
                        {order.status}
                    </span>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-2.5 text-white font-extrabold text-lg">
                        <User size={18} className="text-cyan-400 shrink-0" />
                        <span>{order.customer_name}</span>
                    </div>

                    <div className="flex items-center gap-2.5 text-slate-300 font-bold text-sm">
                        <Phone size={16} className="text-cyan-400 shrink-0" />
                        <a href={`tel:${order.customer_phone}`} className="hover:text-cyan-400 transition-colors">
                            {order.customer_phone}
                        </a>
                    </div>

                    {order.clinic_name && (
                        <div className="flex items-center gap-2.5 text-slate-300 font-bold text-sm">
                            <Building2 size={16} className="text-cyan-400 shrink-0" />
                            <span>{order.clinic_name}</span>
                        </div>
                    )}

                    <div className="flex items-start gap-2.5 text-slate-300 font-semibold text-sm">
                        <MapPin size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                            <span className="block font-bold text-white">{order.customer_governorate}</span>
                            <span className="text-xs text-slate-400 block mt-0.5">{order.customer_address}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Items Section */}
            <div className="flex-1 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between gap-6">
                <div>
                    <h3 className="font-extrabold text-slate-400 text-xs uppercase tracking-wider mb-4">Ordered Items</h3>
                    <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                        {order.items?.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-start sm:items-center gap-4 text-xs sm:text-sm font-semibold border-b border-white/5 pb-2.5 last:border-b-0">
                                <div className="flex-grow min-w-0">
                                    <span className="text-white font-extrabold block truncate uppercase">
                                        {item.name}
                                    </span>
                                    <span className="text-slate-400 text-xs font-semibold block mt-0.5 font-mono">
                                        {item.price ? `${item.price.toLocaleString()} EGP / unit` : 'Quote Request'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    <span className="bg-slate-950 text-slate-300 border border-white/10 px-2.5 py-1 rounded-lg text-xs font-black">
                                        Qty: {item.quantity}
                                    </span>
                                    <span className="text-cyan-400 font-black font-mono">
                                        {item.price ? `${(item.price * item.quantity).toLocaleString()} EGP` : 'Quote'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Total Value</span>
                        <span className="text-2xl font-black text-cyan-400 font-mono">
                            {order.total_price ? `${order.total_price.toLocaleString()} EGP` : 'On Quote'}
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 w-full sm:w-auto items-center">
                        {order.status === 'pending' && (
                            <>
                                <button
                                    onClick={() => onRequestCancel(order.id)}
                                    disabled={actionLoadingId !== null}
                                    className="flex-1 sm:flex-none border border-rose-500/30 hover:bg-rose-500/20 text-rose-400 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => onOpenPriceModal(order)}
                                    disabled={actionLoadingId !== null}
                                    className="flex-1 sm:flex-none bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-50"
                                >
                                    Set Price & Confirm 💰
                                </button>
                            </>
                        )}

                        {order.status === 'confirmed' && (
                            <button
                                onClick={() => onOpenPriceModal(order)}
                                className="flex-1 sm:flex-none border border-white/20 hover:bg-white/10 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer"
                            >
                                Edit Agreed Price ✏️
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderCard;
