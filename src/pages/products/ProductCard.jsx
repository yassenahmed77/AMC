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
        <div className={`group bg-white border rounded-2xl p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full relative overflow-hidden ${
            isMaxReached ? 'border-amber-200 shadow-amber-50/50' : 'border-slate-100'
        }`}>
            {/* Stock Status Badges */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
                {isOutOfStock ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-rose-50 text-rose-600 border border-rose-100 shadow-sm">
                        Sold Out
                    </span>
                ) : (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                        In Stock
                    </span>
                )}

                {isMaxReached && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-amber-50 text-amber-700 border border-amber-200 shadow-sm animate-pulse flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Max Added
                    </span>
                )}
            </div>

            {/* Product Image Wrapper */}
            <Link to={`/products/${product.id}`} className="w-full aspect-[4/3] bg-white rounded-xl overflow-hidden mb-4 flex items-center justify-center p-4">
                <img 
                    src={product.main_image || '/logo.png'} 
                    alt={`${product.name} - AMC Medical Equipment Cairo Egypt`} 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
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
                <h3 className="text-slate-800 font-bold text-lg leading-snug group-hover:text-maincolor transition-colors duration-200 line-clamp-1 mb-2">
                    {product.name}
                </h3>
            </Link>

            {/* Product Description snippet */}
            <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-4 flex-grow">
                {product.description}
            </p>

            {/* Footer section: Price & Action buttons */}
            <div className="mt-auto pt-3 border-t border-slate-50 flex flex-col gap-3">
                <div className="flex justify-between items-baseline">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Price</span>
                    {product.price ? (
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black text-maincolor">{product.price.toLocaleString()}</span>
                            <span className="text-xs font-bold text-maincolor">EGP</span>
                        </div>
                    ) : (
                        <a 
                            href={`https://wa.me/201005183039?text=${encodeURIComponent(`السلام عليكم، حابب أستفسر عن سعر جهاز: ${product.name}${product.main_image ? `\nصورة الجهاز: ${product.main_image}` : ''}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-extrabold px-2.5 py-1 rounded-xl border border-emerald-200/80 transition-all duration-200 hover:scale-105 shadow-sm"
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
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                            isOutOfStock 
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : isMaxReached
                                ? 'bg-amber-50/50 text-amber-700 border border-amber-200/60 cursor-not-allowed'
                                : 'bg-transparent text-maincolor border-2 border-maincolor hover:bg-maincolor hover:text-white cursor-pointer'
                        }`}
                    >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>
                            {isOutOfStock 
                                ? 'Sold Out' 
                                : isMaxReached 
                                ? 'Max Added' 
                                : 'Add to Cart'}
                        </span>
                    </button>

                    <a 
                        href="tel:01122199076"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 shadow-sm shadow-emerald-500/20 shrink-0"
                        title="Call Us Now"
                    >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
