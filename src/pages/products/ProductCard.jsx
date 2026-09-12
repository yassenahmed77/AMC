import { Link } from 'react-router';
import { ShoppingCart, AlertTriangle, Phone, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';

function ProductCard({ product }) {
    const { addToCart, getItemQuantityInCart } = useCart();
    
    const isOutOfStock = product.quantity === 0 || product.quantity === null;
    const quantityInCart = getItemQuantityInCart(product.id);
    const isMaxReached = !isOutOfStock && quantityInCart >= product.quantity;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isOutOfStock || isMaxReached) return;
        addToCart(product, 1);
    };

    return (
        <div className={`group bg-slate-900/75 backdrop-blur-md border rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_35px_rgba(0,240,255,0.14)] transition-all duration-300 flex flex-col h-full relative overflow-hidden ${
            isMaxReached ? 'border-amber-400/60' : 'border-white/10 hover:border-cyan-400/50'
        }`}>
            {/* Stock Status Badges */}
            <div className="absolute top-3.5 left-3.5 z-10 flex gap-2">
                {isOutOfStock ? (
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-800/80 text-slate-400 border border-white/10">
                        Out of Stock
                    </span>
                ) : (
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        In Stock
                    </span>
                )}

                {isMaxReached && (
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-400" />
                        Max Added
                    </span>
                )}
            </div>

            {/* Product Image Wrapper */}
            <Link to={`/products/${product.id}`} className="w-full aspect-[4/3] bg-slate-950/70 rounded-xl overflow-hidden mb-4 flex items-center justify-center p-4 border border-white/5 group-hover:border-cyan-500/20 group-hover:bg-slate-950/90 transition-all">
                <img 
                    src={product.main_image || '/logo.png'} 
                    alt={`${product.name} - AMC Medical Equipment Cairo Egypt`} 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
                    loading="lazy"
                    width={300}
                    height={225}
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/logo.png';
                    }}
                />
            </Link>

            {/* Product Title */}
            <Link to={`/products/${product.id}`}>
                <h3 className="text-white font-bold text-base leading-snug group-hover:text-cyan-400 transition-colors duration-200 line-clamp-1 mb-1.5">
                    {product.name}
                </h3>
            </Link>

            {/* Product Description snippet */}
            <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4 flex-grow font-normal">
                {product.description}
            </p>

            {/* Footer section: Price & Action buttons */}
            <div className="mt-auto pt-3 border-t border-white/10 flex flex-col gap-3">
                <div className="flex justify-between items-center min-h-[32px]">
                    <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">Price</span>
                    {product.price ? (
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-white">{product.price.toLocaleString()}</span>
                            <span className="text-xs font-bold text-cyan-400">EGP</span>
                        </div>
                    ) : (
                        <a 
                            href={`https://wa.me/201005183039?text=${encodeURIComponent(`السلام عليكم، حابب أستفسر عن سعر جهاز: ${product.name}${product.main_image ? `\nصورة الجهاز: ${product.main_image}` : ''}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-lg border border-emerald-500/30 transition-colors"
                            title="إستفسر عن السعر على الواتساب"
                        >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                            <span>استفسر عن السعر</span>
                        </a>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button 
                        onClick={handleAddToCart}
                        disabled={isOutOfStock || isMaxReached}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                            isOutOfStock 
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/10'
                                : isMaxReached
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 cursor-not-allowed'
                                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold cursor-pointer shadow-md shadow-cyan-500/20 active:scale-95'
                        }`}
                    >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>
                            {isOutOfStock 
                                ? 'Out of Stock' 
                                : isMaxReached 
                                ? 'Max Added' 
                                : 'Add to Cart'}
                        </span>
                    </button>

                    <a 
                        href="tel:01122199076"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center gap-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors border border-white/10 shrink-0"
                        title="Call Us Now"
                    >
                        <Phone className="w-3.5 h-3.5 text-slate-300" />
                        <span>Call</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
