import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router';
import { supabase } from '../../lib/supabase';
import { useCart } from '../../context/CartContext';
import SEO from '../../components/SEO';
import { 
    AlertCircle, 
    ShoppingCart, 
    AlertTriangle, 
    Minus, 
    Plus, 
    Phone, 
    MessageSquare, 
    MessageCircle, 
    ArrowLeft,
    ShieldCheck,
    Truck,
    Headphones
} from 'lucide-react';
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
            <div className="container py-12 min-h-screen bg-transparent">
                <div className="h-6 w-36 bg-slate-800/60 rounded-lg animate-pulse mb-8"></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-10 rounded-3xl border border-white/10">
                    <div className="space-y-4">
                        <div className="w-full aspect-[4/3] bg-slate-800/50 rounded-2xl animate-pulse border border-white/5"></div>
                        <div className="flex gap-3 justify-center">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800/50 rounded-xl animate-pulse border border-white/5"></div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="h-5 bg-slate-800/50 rounded w-1/4 animate-pulse"></div>
                        <div className="h-10 bg-slate-800/50 rounded w-3/4 animate-pulse"></div>
                        <div className="h-20 bg-slate-800/50 rounded w-full animate-pulse"></div>
                        <div className="h-14 bg-slate-800/50 rounded w-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container py-16 text-center min-h-[60vh] flex flex-col items-center justify-center bg-transparent">
                <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-10 rounded-3xl max-w-md w-full shadow-2xl">
                    <AlertCircle className="w-16 h-16 text-rose-500 mb-4 mx-auto animate-bounce" />
                    <h2 className="text-2xl font-black text-white mb-2">Product Not Found</h2>
                    <p className="text-slate-400 mb-6 text-sm">{error || "The product you are looking for does not exist or has been removed."}</p>
                    <Link 
                        to="/products"
                        className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 rounded-xl font-bold transition-all shadow-md shadow-cyan-500/20"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Store</span>
                    </Link>
                </div>
            </div>
        );
    }

    const galleryImages = [product.main_image, ...(product.images || [])].filter(Boolean);
    const isOutOfStock = product.quantity === 0 || product.quantity === null;
    const quantityInCart = getItemQuantityInCart(product.id);
    const isMaxReached = !isOutOfStock && quantityInCart >= product.quantity;
    const whatsappMessage = encodeURIComponent(`السلام عليكم، محتاج أستفسر عن سعر جهاز: ${product.name}`);

    return (
        <section className="py-8 sm:py-14 bg-transparent min-h-screen">
            <SEO 
                title={`${product.name} - AMC Medical Equipment`} 
                description={product.description?.slice(0, 160) || "Certified medical equipment available at AMC Medical Store Egypt."} 
                image={product.main_image} 
            />
            <div className="container">
                {/* Back Link */}
                <Link 
                    to="/products" 
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold text-sm mb-6 transition-colors group cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span>Back to Products</span>
                </Link>

                {/* Main Product Glassmorphic Card */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start bg-slate-900/75 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                    
                    {/* Left Column: Interactive Image Gallery */}
                    <div className="space-y-4">
                        <div className="w-full aspect-[4/3] bg-slate-950/70 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center p-6 relative group shadow-inner">
                            <img 
                                src={activeImage} 
                                alt={product.name} 
                                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                            />
                            {activeImage !== product.main_image && (
                                <span className="absolute bottom-4 right-4 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-lg backdrop-blur-md animate-pulse">
                                    Real Life Photo
                                </span>
                            )}
                        </div>

                        {/* Gallery Thumbnails */}
                        {galleryImages.length > 1 && (
                            <div className="flex flex-wrap justify-center gap-3 pt-1">
                                {galleryImages.map((imgUrl, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => setActiveImage(imgUrl)}
                                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border flex items-center justify-center p-2 cursor-pointer transition-all ${
                                            activeImage === imgUrl 
                                                ? 'border-cyan-400 ring-2 ring-cyan-400/40 bg-slate-900 shadow-lg shadow-cyan-500/20' 
                                                : 'border-white/10 bg-slate-950/80 hover:border-cyan-400/50 hover:bg-slate-900'
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
                        {/* Title & Badge */}
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-3.5 py-1 rounded-md inline-block border border-cyan-500/30 mb-3">
                                Certified Medical Equipment
                            </span>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
                                {product.name}
                            </h1>
                        </div>

                        {/* Price & Stock info */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-white/10">
                            <div>
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Price</span>
                                {product.price ? (
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                                            {product.price.toLocaleString()}
                                        </span>
                                        <span className="text-sm font-bold text-cyan-400 uppercase">EGP</span>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <a 
                                            href={`https://wa.me/201005183039?text=${encodeURIComponent(`السلام عليكم، حابب أستفسر عن سعر جهاز: ${product.name}${product.main_image ? `\nصورة الجهاز: ${product.main_image}` : ''}`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl border border-emerald-500/30 transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
                                        >
                                            <MessageCircle className="w-4 h-4 text-emerald-400" />
                                            <span>استفسر عن السعر على الواتساب</span>
                                        </a>
                                        <span className="text-xs font-medium text-slate-400 block">
                                            تواصل معنا مباشرة عبر الواتساب لمعرفة السعر والتفاصيل
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="text-right ml-auto sm:ml-0">
                                {isOutOfStock ? (
                                    <span className="inline-flex items-center gap-1.5 text-slate-400 font-bold bg-slate-800/80 px-3.5 py-1.5 rounded-lg border border-white/10 text-xs">
                                        Out of Stock
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-2 text-emerald-400 font-bold bg-emerald-500/15 px-3.5 py-1.5 rounded-lg border border-emerald-500/30 text-xs">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                        In Stock
                                    </span>
                                )}
                                
                                {isMaxReached && (
                                    <div className="mt-2 text-xs font-bold text-amber-400 flex items-center gap-1.5 justify-end">
                                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                                        <span>Max quantity in cart</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="font-bold text-white mb-2 text-sm sm:text-base">Product Details & Specifications</h3>
                            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-normal">
                                {product.description}
                            </p>
                        </div>

                        {/* Quantity Selector */}
                        {!isOutOfStock && !isMaxReached && (
                            <div className="flex items-center gap-6 py-3 border-y border-white/10">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quantity</span>
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => qty > 1 && setQty(qty - 1)}
                                        disabled={qty <= 1}
                                        className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                                            qty <= 1 
                                                ? 'border-white/5 text-slate-600 bg-slate-900/50 cursor-not-allowed' 
                                                : 'border-white/15 text-white hover:bg-slate-800 hover:border-cyan-400/40 active:scale-95 cursor-pointer bg-slate-950/60'
                                        }`}
                                    >
                                        <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="w-12 text-center font-black text-white text-base tabular-nums">
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
                                        className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/15 text-white hover:bg-slate-800 hover:border-cyan-400/40 active:scale-95 transition-all cursor-pointer bg-slate-950/60"
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
                                <div className="w-full flex items-center justify-center gap-2 bg-slate-850 text-slate-500 font-bold px-6 py-4 rounded-xl border border-white/5 cursor-not-allowed">
                                    <span>Out of Stock</span>
                                </div>
                            ) : isMaxReached ? (
                                <button 
                                    disabled
                                    className="w-full flex items-center justify-center gap-2 bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold px-6 py-4 rounded-xl cursor-not-allowed"
                                >
                                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                                    <span>Maximum Quantity Added to Cart</span>
                                </button>
                            ) : (
                                <button 
                                    onClick={handleAddToCart}
                                    className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-6 py-4 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer text-sm sm:text-base"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    <span>Add to Cart</span>
                                </button>
                            )}

                            {/* Direct Call Button */}
                            <a 
                                href="tel:01122199076"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-4 rounded-xl border border-white/20 hover:border-cyan-400/40 backdrop-blur-md transition-all cursor-pointer shrink-0 text-sm sm:text-base"
                            >
                                <Phone className="w-4 h-4 text-cyan-400" />
                                <span>Call Us</span>
                            </a>

                            {/* WhatsApp Button */}
                            <a 
                                href={`https://wa.me/201005183039?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-4 rounded-xl shadow-lg shadow-emerald-600/25 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer shrink-0 text-sm sm:text-base"
                            >
                                <MessageSquare className="w-4 h-4" />
                                <span>WhatsApp</span>
                            </a>
                        </div>

                        {/* Medical Equipment Trust Highlights */}
                        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/10 text-xs">
                            <div className="flex items-center gap-2 text-slate-300">
                                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                                <span>100% Certified & Inspected</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                                <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
                                <span>Fast Hospital Delivery</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                                <Headphones className="w-4 h-4 text-cyan-400 shrink-0" />
                                <span>Engineer Technical Support</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductsDetails;
