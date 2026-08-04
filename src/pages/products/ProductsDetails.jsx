import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router';
import { supabase } from '../../lib/supabase';
import { useCart } from '../../context/CartContext';
import SEO from '../../components/SEO';
import { AlertCircle, ShoppingCart, Activity, AlertTriangle, Minus, Plus, Phone, MessageSquare, MessageCircle } from 'lucide-react';
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
        setQty(1); // Reset selector to 1 after adding
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
    const whatsappMessage = encodeURIComponent(`السلام عليكم، محتاج أستفسر عن سعر جهاز: ${product.name}`);

    return (
        <section className="py-12 bg-slate-50/50 min-h-screen">
            <SEO 
                title={`${product.name} - AMC Medical Equipment`} 
                description={product.description?.slice(0, 160) || "Certified medical equipment available at AMC Medical Store Egypt."} 
                image={product.main_image} 
            />
            <div className="container">
                {/* Main Product Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-sm">
                    
                    {/* Left Column: Interactive Image Gallery */}
                    <div className="space-y-4">
                        <div className="w-full aspect-[4/3] bg-slate-50/50 rounded-xl overflow-hidden border border-slate-200/80 flex items-center justify-center p-6 relative">
                            <img 
                                src={activeImage} 
                                alt={product.name} 
                                className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300" 
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
                                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border bg-white flex items-center justify-center p-1.5 cursor-pointer transition-all ${
                                            activeImage === imgUrl 
                                                ? 'border-maincolor ring-2 ring-maincolor/20' 
                                                : 'border-slate-200 hover:border-slate-300'
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
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
                                {product.name}
                            </h1>
                        </div>

                        {/* Price & Stock info */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-slate-100">
                            <div>
                                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Price</span>
                                {product.price ? (
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl sm:text-3xl font-bold text-slate-900">
                                            {product.price.toLocaleString()}
                                        </span>
                                        <span className="text-sm font-semibold text-slate-500">EGP</span>
                                    </div>
                                ) : (
                                    <div className="space-y-1.5">
                                        <a 
                                            href={`https://wa.me/201005183039?text=${encodeURIComponent(`السلام عليكم، حابب أستفسر عن سعر جهاز: ${product.name}${product.main_image ? `\nصورة الجهاز: ${product.main_image}` : ''}`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-lg border border-emerald-200 transition-colors"
                                        >
                                            <MessageCircle className="w-4 h-4 text-emerald-600" />
                                            <span>استفسر عن السعر على الواتساب</span>
                                        </a>
                                        <span className="text-xs font-normal text-slate-500 block">
                                            تواصل معنا مباشرة عبر الواتساب لمعرفة السعر والتفاصيل
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="text-right ml-auto sm:ml-0">
                                {isOutOfStock ? (
                                    <span className="inline-flex items-center gap-1.5 text-slate-600 font-semibold bg-slate-100 px-3 py-1 rounded-md border border-slate-200 text-xs">
                                        Out of Stock
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 text-xs">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                        In Stock
                                    </span>
                                )}
                                
                                {isMaxReached && (
                                    <div className="mt-2 text-[11px] font-semibold text-amber-700 flex items-center gap-1 justify-end">
                                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                                        <span>Max quantity in cart</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">Product Details & Specifications</h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-normal">
                                {product.description}
                            </p>
                        </div>

                        {/* Quantity Selector */}
                        {!isOutOfStock && !isMaxReached && (
                            <div className="flex items-center gap-6 py-3 border-y border-slate-100">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Quantity</span>
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => qty > 1 && setQty(qty - 1)}
                                        disabled={qty <= 1}
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                                            qty <= 1 
                                                ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed' 
                                                : 'border-slate-200 text-slate-700 hover:bg-slate-100 active:scale-95 cursor-pointer bg-white'
                                        }`}
                                    >
                                        <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="w-10 text-center font-bold text-slate-900 text-base tabular-nums">
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
                                        className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer bg-white"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                            {/* Add to Cart */}
                            {isOutOfStock ? (
                                <div className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-400 font-semibold px-5 py-3 rounded-xl border border-slate-200 cursor-not-allowed">
                                    <span>Out of Stock</span>
                                </div>
                            ) : isMaxReached ? (
                                <button 
                                    disabled
                                    className="w-full flex items-center justify-center gap-2 bg-amber-50 text-amber-800 border border-amber-200 font-semibold px-5 py-3 rounded-xl cursor-not-allowed"
                                >
                                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                                    <span>Maximum Quantity Added to Cart</span>
                                </button>
                            ) : (
                                <button 
                                    onClick={handleAddToCart}
                                    className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-maincolor hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    <span>Add to Cart</span>
                                </button>
                            )}

                            {/* Direct Call Button */}
                            <a 
                                href="tel:01122199076"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-5 py-3.5 rounded-xl border border-slate-200 transition-colors cursor-pointer shrink-0"
                            >
                                <Phone className="w-4 h-4 text-slate-600" />
                                <span>Call Us</span>
                            </a>

                            {/* WhatsApp Button */}
                            <a 
                                href={`https://wa.me/201005183039?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-3.5 rounded-xl shadow-sm transition-colors cursor-pointer shrink-0"
                            >
                                <MessageSquare className="w-4 h-4" />
                                <span>WhatsApp</span>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductsDetails;
