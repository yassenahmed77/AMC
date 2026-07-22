import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

function Cart() {
    const { cartItems, addToCart, decreaseQuantity, removeFromCart } = useCart();

    // Calculate subtotal
    const subtotal = cartItems.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
    }, 0);

    // No shipping calculations f Cart page - shipping is dynamic at checkout.

    const handleIncrement = (item) => {
        addToCart(item, 1);
    };

    return (
        <section className="min-h-screen bg-slate-50/50 py-12">
            <div className="container">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-6 mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight uppercase">Your Shopping Cart</h1>
                        <p className="text-slate-500 text-sm mt-1">Manage your selected medical items and proceed to checkout</p>
                    </div>
                    <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-maincolor hover:text-primarycolor transition-colors group">
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        <span>Continue Shopping</span>
                    </Link>
                </div>

                {cartItems.length === 0 ? (
                    /* Empty Cart State */
                    <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-3xl border border-slate-100 shadow-sm text-center max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-maincolor mb-6 animate-bounce">
                            <ShoppingBag size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 uppercase">Your Cart is Empty</h2>
                        <p className="text-slate-500 mt-2 max-w-sm">You haven't added any products to your cart yet.</p>
                        <Link to="/products" className="bg-maincolor text-white px-8 py-3.5 rounded-xl font-bold mt-8 shadow-lg shadow-maincolor/30 hover:bg-maincolor/90 hover:shadow-xl transition-all duration-300 cursor-pointer">
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    /* Cart Content */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                        {/* Items List */}
                        <div className="lg:col-span-2 flex flex-col gap-5">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 items-center">
                                    
                                    {/* Image */}
                                    <div className="w-24 h-24 bg-white p-2 rounded-xl border border-slate-100 flex items-center justify-center shadow-inner shrink-0 overflow-hidden">
                                        <img src={item.main_image} alt={item.name} className="max-w-full max-h-full object-contain" />
                                    </div>
                                    
                                    {/* Info */}
                                    <div className="flex flex-col flex-grow text-center sm:text-left">
                                        <h3 className="font-extrabold text-slate-800 text-lg uppercase leading-snug line-clamp-1">{item.name}</h3>
                                        <div className="flex items-center justify-center sm:justify-start gap-1 text-maincolor font-bold text-sm mt-2">
                                            <span>{item.price ? item.price.toLocaleString() : "Request Quote"}</span>
                                            {item.price && <span className="text-xs">EGP</span>}
                                        </div>
                                    </div>
                                    
                                    {/* Action Section */}
                                    <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-end gap-6 sm:gap-4 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                        
                                        {/* Qty Selector */}
                                        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1 font-bold">
                                            <button 
                                                onClick={() => decreaseQuantity(item.id)} 
                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white hover:text-maincolor transition-all shadow-sm cursor-pointer"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-10 text-center text-slate-800 text-sm">{item.quantity}</span>
                                            <button 
                                                onClick={() => handleIncrement(item)} 
                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white hover:text-maincolor transition-all shadow-sm cursor-pointer"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        
                                        {/* Total & Delete */}
                                        <div className="flex items-center gap-4">
                                            <div className="text-right hidden sm:block">
                                                <span className="text-xs text-slate-400 font-semibold block">Subtotal</span>
                                                <span className="font-extrabold text-slate-800 text-base">
                                                    {item.price ? `${(item.price * item.quantity).toLocaleString()} EGP` : "On Quote"}
                                                </span>
                                            </div>
                                            <button 
                                                onClick={() => removeFromCart(item.id)}
                                                className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
                                                title="Remove item"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>

                        {/* Summary Panel */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-6 sticky top-28">
                            <h2 className="font-extrabold text-slate-800 text-lg uppercase border-b border-slate-100 pb-4">Order Summary</h2>
                            
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-baseline border-b border-slate-100 pb-4">
                                    <span className="text-base font-bold text-slate-800 uppercase">Subtotal</span>
                                    <div className="text-right">
                                        <span className="text-2xl font-black text-maincolor">{subtotal.toLocaleString()}</span>
                                        <span className="text-xs font-bold text-maincolor ml-1">EGP</span>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                                    * Shipping fees will be communicated during the confirmation call.
                                </p>
                            </div>
                            <Link to="/checkout" className="w-full bg-maincolor text-white font-bold uppercase py-4 rounded-xl shadow-lg shadow-maincolor/30 hover:bg-maincolor/90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer mt-2 text-center text-sm block">
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Cart;
