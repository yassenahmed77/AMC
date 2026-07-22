function ProductCardSkeleton() {
    return (
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full animate-pulse">
            {/* Image Placeholder */}
            <div className="w-full aspect-[4/3] bg-slate-100 rounded-xl mb-4"></div>
            
            {/* Condition Badge Placeholder */}
            <div className="h-5 bg-slate-100 rounded w-16 mb-3"></div>
            
            {/* Title Placeholder */}
            <div className="h-6 bg-slate-100 rounded w-3/4 mb-2"></div>
            
            {/* Description/Category Placeholder */}
            <div className="h-4 bg-slate-100 rounded w-full mb-1"></div>
            <div className="h-4 bg-slate-100 rounded w-5/6 mb-4"></div>
            
            {/* Price & Button Placeholder */}
            <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
                <div className="h-6 bg-slate-100 rounded w-20"></div>
                <div className="h-9 bg-slate-100 rounded-lg w-24"></div>
            </div>
        </div>
    );
}

export default ProductCardSkeleton;
