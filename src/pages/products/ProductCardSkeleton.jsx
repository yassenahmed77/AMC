function ProductCardSkeleton() {
    return (
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 shadow-sm transition-all duration-300 flex flex-col h-full animate-pulse">
            {/* Image Placeholder */}
            <div className="w-full aspect-[4/3] bg-slate-800/80 rounded-xl mb-4"></div>
            
            {/* Condition Badge Placeholder */}
            <div className="h-5 bg-slate-800/80 rounded w-16 mb-3"></div>
            
            {/* Title Placeholder */}
            <div className="h-6 bg-slate-800/80 rounded w-3/4 mb-2"></div>
            
            {/* Description/Category Placeholder */}
            <div className="h-4 bg-slate-800/80 rounded w-full mb-1"></div>
            <div className="h-4 bg-slate-800/80 rounded w-5/6 mb-4"></div>
            
            {/* Price & Button Placeholder */}
            <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="h-6 bg-slate-800/80 rounded w-20"></div>
                <div className="h-9 bg-slate-800/80 rounded-lg w-24"></div>
            </div>
        </div>
    );
}

export default ProductCardSkeleton;
