import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { supabase } from '../../lib/supabase';
import { useCart } from '../../context/CartContext';
import SEO from '../../components/SEO';
import { AlertCircle, ShoppingCart, Activity, AlertTriangle, Minus, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

async function fetchProductById(productId) {
    const { data, error } = await supabase
        .from('products')
        .select('id, name, description, price, quantity, main_image, images')
        .eq('id', productId)
        .single();

    if (error) throw error;
    return data;
}

function ProductsDetails() {
    const { id } = useParams();
    const { addToCart, getItemQuantityInCart } = useCart();
    
    const [userActiveImage, setUserActiveImage] = useState(null);
    const [qty, setQty] = useState(1);

    const { data: product, isLoading: loading, isError, error } = useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProductById(id),
        enabled: Boolean(id),
        onError: (err) => {
            toast.error(err.message || 'Failed to fetch product details.');
        }
    });

    const activeImage = userActiveImage || product?.main_image || '';
    const setActiveImage = (img) => setUserActiveImage(img);

    const handleAddToCart = () => {
        if (isMaxReached) return;
        addToCart(product, qty);
        setQty(1); // Reset to 1 after adding
    };

    if (loading) {
        return (
            <div className="container py-12 min-h-screen">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <div className="w-full aspect-[4/3] bg-slate-100 rounded-3xl animate-pulse"></div>
                        <div className="flex gap-3">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-20 h-20 bg-slate-100 rounded-xl animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="h-6 bg-slate-100 rounded w-1/4 animate-pulse"></div>
                        <div className="h-10 bg-slate-100 rounded w-3/4 animate-pulse"></div>
                        <div className="h-24 bg-slate-100 rounded w-full animate-pulse"></div>
                        <div className="h-12 bg-slate-100 rounded w-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container py-16 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <AlertCircle className="w-16 h-16 text-rose-500 mb-4 animate-bounce" />
                <h2 className="text-2xl font-black text-slate-800 mb-2">Product Not Found</h2>
                <p className="text-slate-500 mb-6 max-w-md">{error || "The product you are looking for does not exist or has been removed."}</p>
            </div>
        );
    }

    const galleryImages = [product.main_image, ...(product.images || [])].filter(Boolean);
    const isOutOfStock = product.quantity === 0 || product.quantity === null;
    const quantityInCart = getItemQuantityInCart(product.id);
    const isMaxReached = !isOutOfStock && quantityInCart >= product.quantity;

    return (
        <section className="py-12 bg-slate-50/50 min-h-screen">
            <SEO 
                title={`${product.name} - Price & Specs`} 
                description={product.description?.slice(0, 160) || "Certified medical equipment available at AMC Medical Store Egypt."} 
                image={product.main_image} 
            />
            <div className="container">
                {/* Main Product Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50">
                    
                    {/* Left Column: Interactive Image Gallery */}
                    <div className="space-y-4">
                        <div className="w-full aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-md flex items-center justify-center p-6 relative">
                            <img 
                                src={activeImage} 
                                alt={product.name} 
                                className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500" 
                            />
                            {activeImage !== product.main_image && (
                                <span className="absolute bottom-4 right-4 bg-emerald-500 text-white text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md animate-pulse">
                                    Real Life Photo
                                </span>
                            )}
                        </div>

                        {/* Gallery Thumbnails */}
                        {galleryImages.length > 1 && (
                            <div className="flex flex-wrap justify-center gap-3">
                                {galleryImages.map((imgUrl, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => setActiveImage(imgUrl)}
                                        className={`w-20 h-20 rounded-xl overflow-hidden border-2 bg-white flex items-center justify-center p-2 cursor-pointer transition-all duration-300 ${
                                            activeImage === imgUrl 
                                                ? 'border-maincolor scale-105 shadow-md shadow-maincolor/10' 
                                                : 'border-slate-100 hover:border-slate-300 hover:scale-102'
                                        }`}
                                    >
                                        <img src={imgUrl} alt="" className="max-w-full max-h-full object-contain" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Product Specs & CTAs */}
                    <div className="flex flex-col space-y-6">
                        {/* Title */}
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 tracking-tight leading-tight">
                                {product.name}
                            </h1>
                        </div>

                        {/* Price & Stock info */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-slate-100">
                            <div>
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Price</span>
                                {product.price ? (
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl sm:text-3xl font-black text-maincolor">
                                            {product.price.toLocaleString()}
                                        </span>
                                        <span className="text-sm font-bold text-maincolor">EGP</span>
                                    </div>
                                ) : (
                                    <span className="text-xl sm:text-2xl font-black text-primarycolor italic">Request Quote</span>
                                )}
                            </div>

                            <div className="text-right ml-auto sm:ml-0">
                                {isOutOfStock ? (
                                    <span className="inline-flex items-center gap-1.5 text-rose-600 font-extrabold bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100 text-xs uppercase">
                                        Sold Out
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 text-emerald-600 font-extrabold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 text-xs uppercase">
                                        <Activity className="w-3.5 h-3.5 animate-pulse" />
                                        In Stock
                                    </span>
                                )}
                                
                                {isMaxReached && (
                                    <div className="mt-2 text-[10px] font-bold text-amber-600 flex items-center gap-1 justify-end uppercase tracking-wide">
                                        <AlertTriangle className="w-3.5 h-3.5 animate-pulse text-amber-500" />
                                        <span>Max quantity in cart</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="font-bold text-slate-800 mb-2 text-base sm:text-lg">Product Description</h3>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                {product.description}
                            </p>
                        </div>

                        {/* Quantity Selector */}
                        {!isOutOfStock && !isMaxReached && (
                            <div className="flex items-center gap-6 py-4 border-y border-slate-50">
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Quantity</span>
                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={() => qty > 1 && setQty(qty - 1)}
                                        disabled={qty <= 1}
                                        className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 ${
                                            qty <= 1 
                                                ? 'border-slate-100 text-slate-300 bg-slate-50/50 cursor-not-allowed' 
                                                : 'border-slate-200 text-slate-600 hover:bg-maincolor hover:text-white hover:border-maincolor shadow-sm active:scale-95 cursor-pointer bg-white'
                                        }`}
                                    >
                                        <Minus className="w-4.5 h-4.5" />
                                    </button>
                                    <span className="w-12 text-center font-black text-slate-800 text-lg tabular-nums">
                                        {qty}
                                    </span>
                                    <button 
                                        onClick={() => {
                                            const maxAllowed = product.quantity - quantityInCart;
                                            if (qty < maxAllowed) {
                                                setQty(qty + 1);
                                            } else {
                                                toast.error(`Only ${product.quantity} units available.`);
                                            }
                                        }}
                                        className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-200 text-slate-600 hover:bg-maincolor hover:text-white hover:border-maincolor shadow-sm active:scale-95 transition-all duration-200 cursor-pointer bg-white"
                                    >
                                        <Plus className="w-4.5 h-4.5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="pt-2">
                            {/* Add to Cart */}
                            {isOutOfStock ? (
                                <div className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-400 font-bold px-6 py-4 rounded-2xl cursor-not-allowed">
                                    <span>Out of Stock</span>
                                </div>
                            ) : isMaxReached ? (
                                <button 
                                    disabled
                                    className="w-full flex items-center justify-center gap-2 bg-amber-50/50 text-amber-700 border border-amber-200/60 font-bold px-6 py-4 rounded-2xl cursor-not-allowed animate-pulse"
                                >
                                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                                    <span>Maximum Quantity Added to Cart</span>
                                </button>
                            ) : (
                                <button 
                                    onClick={handleAddToCart}
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-maincolor to-blue-700 text-white font-bold px-6 py-4 rounded-2xl shadow-lg shadow-maincolor/10 hover:shadow-xl hover:shadow-maincolor/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-100 transition-all duration-300 cursor-pointer"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    <span>Add to Cart</span>
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductsDetails;
