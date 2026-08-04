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
        <div className={`group bg-white border rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-slate-300 transition-all duration-300 flex flex-col h-full relative overflow-hidden ${
            isMaxReached ? 'border-amber-300' : 'border-slate-200/80'
        }`}>
            {/* Stock Status Badges */}
            <div className="absolute top-3.5 left-3.5 z-10 flex gap-2">
                {isOutOfStock ? (
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        Out of Stock
                    </span>
                ) : (
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        In Stock
                    </span>
                )}

                {isMaxReached && (
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        Max Added
                    </span>
                )}
            </div>

            {/* Product Image Wrapper */}
            <Link to={`/products/${product.id}`} className="w-full aspect-[4/3] bg-slate-50/50 rounded-xl overflow-hidden mb-4 flex items-center justify-center p-4 border border-slate-100 group-hover:bg-white transition-colors">
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
                <h3 className="text-slate-900 font-bold text-base leading-snug group-hover:text-maincolor transition-colors duration-200 line-clamp-1 mb-1.5">
                    {product.name}
                </h3>
            </Link>

            {/* Product Description snippet */}
            <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4 flex-grow font-normal">
                {product.description}
            </p>

            {/* Footer section: Price & Action buttons */}
            <div className="mt-auto pt-3 border-t border-slate-100 flex flex-col gap-3">
                <div className="flex justify-between items-center min-h-[32px]">
                    <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">Price</span>
                    {product.price ? (
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-slate-900">{product.price.toLocaleString()}</span>
                            <span className="text-xs font-semibold text-slate-500">EGP</span>
                        </div>
                    ) : (
                        <a 
                            href={`https://wa.me/201005183039?text=${encodeURIComponent(`السلام عليكم، حابب أستفسر عن سعر جهاز: ${product.name}${product.main_image ? `\nصورة الجهاز: ${product.main_image}` : ''}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
                            title="إستفسر عن السعر على الواتساب"
                        >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
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
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                                : isMaxReached
                                ? 'bg-amber-50 text-amber-800 border border-amber-200 cursor-not-allowed'
                                : 'bg-maincolor hover:bg-blue-700 text-white font-bold cursor-pointer shadow-sm active:scale-95'
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
                        className="flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors border border-slate-200 shrink-0"
                        title="Call Us Now"
                    >
                        <Phone className="w-3.5 h-3.5 text-slate-600" />
                        <span>Call</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
