import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, ArrowDown } from 'lucide-react';

function Cart() {
    const { cartItems, addToCart, decreaseQuantity, removeFromCart } = useCart();

    const handleIncrement = (item) => {
        addToCart(item, 1);
    };

    return (
        <section className="min-h-screen bg-transparent py-10 sm:py-16">
            <div className="container">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-6 mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight uppercase">Your Shopping Cart</h1>
                        <p className="text-slate-400 text-sm mt-1">Review your selected medical devices and proceed to checkout</p>
                    </div>
                    <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors group">
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        <span>Continue Shopping</span>
                    </Link>
                </div>

                {cartItems.length === 0 ? (
                    /* Empty Cart State */
                    <div className="flex flex-col items-center justify-center py-20 px-6 bg-slate-900/75 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl text-center max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-cyan-950/60 border border-cyan-500/30 rounded-3xl flex items-center justify-center text-cyan-400 mb-6 animate-bounce shadow-lg shadow-cyan-950/50">
                            <ShoppingBag size={38} />
                        </div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tight">Your Cart is Empty</h2>
                        <p className="text-slate-400 mt-2 max-w-sm text-sm">You haven't added any products to your cart yet.</p>
                        <Link to="/products" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-3.5 rounded-xl font-black mt-8 shadow-lg shadow-cyan-500/25 transition-all duration-300 cursor-pointer text-sm uppercase tracking-wider">
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    /* Cart Content */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                        {/* Items List */}
                        <div className="lg:col-span-2 flex flex-col gap-5">
                            {/* Information Banner */}
                            <div className="bg-cyan-950/50 border border-cyan-500/30 rounded-2xl p-4 flex items-start gap-3 backdrop-blur-md">
                                <div className="text-cyan-400 text-lg">💡</div>
                                <p className="text-xs sm:text-sm font-bold text-cyan-100 leading-relaxed">
                                    جميع الأسعار قابلة للتفاوض، وسيتم التواصل معكم فور إرسال الطلب لتأكيد السعر النهائي وتأكيد الطلب.
                                </p>
                            </div>

                            {cartItems.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-5 bg-slate-900/75 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg hover:border-cyan-400/40 transition-all duration-300 items-center">
                                    
                                    {/* Image */}
                                    <div className="w-24 h-24 bg-slate-950/80 p-2.5 rounded-xl border border-white/10 flex items-center justify-center shadow-inner shrink-0 overflow-hidden">
                                        <img 
                                            src={item.main_image || item.image || item.images?.[0] || '/logo.png'} 
                                            alt={item.name} 
                                            className="max-w-full max-h-full object-contain" 
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = '/logo.png';
                                            }}
                                        />
                                    </div>
                                    
                                    {/* Info */}
                                    <div className="flex flex-col flex-grow text-center sm:text-left">
                                        <h3 className="font-extrabold text-white text-lg uppercase leading-snug line-clamp-1">{item.name}</h3>
                                        {item.price ? (
                                            <div className="flex items-center justify-center sm:justify-start gap-1 text-cyan-400 font-black text-sm mt-2">
                                                <span>{item.price.toLocaleString()} EGP</span>
                                            </div>
                                        ) : (
                                            <span className="text-xs font-bold text-slate-400 mt-2">استفسر عن السعر عند الطلب</span>
                                        )}
                                    </div>
                                    
                                    {/* Action Section: Quantity Selector & Trash button */}
                                    <div className="flex items-center gap-3 shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/10 w-full sm:w-auto justify-between sm:justify-end">
                                        {/* Qty Selector */}
                                        <div className="flex items-center border border-white/15 rounded-xl bg-slate-950/80 p-1 font-bold">
                                            <button 
                                                onClick={() => decreaseQuantity(item.id)} 
                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-10 text-center text-white text-sm font-mono">{item.quantity}</span>
                                            <button 
                                                onClick={() => handleIncrement(item)} 
                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        
                                        {/* Delete Button */}
                                        <button 
                                            onClick={() => removeFromCart(item.id)}
                                            className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/20 flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0"
                                            title="Remove item"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>

                        {/* Summary Panel */}
                        <div className="bg-slate-900/80 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col gap-6 sticky top-28">
                            <h2 className="font-black text-white text-lg uppercase border-b border-white/10 pb-4 tracking-tight">Order Summary</h2>
                            
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                    <span className="text-sm font-bold text-slate-300 uppercase">Pricing</span>
                                    <span className="text-xs font-black text-cyan-300 bg-cyan-950/60 px-3 py-1.5 rounded-xl border border-cyan-500/30">
                                        التواصل المباشر للتسعير
                                    </span>
                                </div>
                                <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-4 flex flex-col gap-2">
                                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                                        📞 التواصل والتسليم
                                    </span>
                                    <p className="text-xs text-emerald-200/90 font-medium leading-relaxed">
                                        سيتم التواصل معكم هاتفياً أو عبر الواتساب فور إرسال الطلب لتأكيد السعر النهائي وتأكيد الطلب.
                                    </p>
                                </div>
                                <div className="flex items-center justify-center gap-1.5 text-cyan-400 text-xs font-black pt-2 pb-1 animate-bounce">
                                    <span>اضغط بالأسفل لإتمام الطلب والتواصل</span>
                                    <ArrowDown size={16} className="text-cyan-400 shrink-0" />
                                </div>
                            </div>
                            <Link to="/checkout" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase py-4 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer mt-1 text-center text-sm block tracking-wider">
                                Proceed to Checkout ➔
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Cart;
