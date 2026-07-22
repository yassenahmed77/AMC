import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import { AlertCircle, RefreshCw, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';

async function fetchProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('id, name, price, main_image, quantity')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

function Products() {
    const { data: products = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        onError: (err) => {
            toast.error(err.message || 'Failed to fetch products.');
        }
    });

    return (
        <section className="py-12 bg-slate-50/50 min-h-screen">
            <div className="container">
                {/* Header */}
                <div className="mb-10 text-center lg:text-left">
                    <h1 className="text-3xl sm:text-5xl font-black text-slate-800 tracking-tight mb-3">
                        Medical Equipment Store
                    </h1>
                    <p className="text-slate-500 text-sm sm:text-base font-medium max-w-2xl">
                        Discover our comprehensive inventory of premium medical devices trusted by healthcare professionals.
                    </p>
                </div>

                {/* Error State */}
                {isError && (
                    <div className="text-center py-16 bg-white border border-slate-100 rounded-3xl p-8 max-w-md mx-auto shadow-sm">
                        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-800 mb-1">Failed to Load Products</h3>
                        <p className="text-slate-500 text-sm mb-6">{error?.message || 'Error occurred.'}</p>
                        <button 
                            onClick={() => refetch()}
                            className="inline-flex items-center gap-2 bg-maincolor text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:scale-[1.02] active:scale-100 transition-all cursor-pointer"
                        >
                            <RefreshCw className="w-4 h-4" />
                            <span>Try Again</span>
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {!isError && isLoading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* Listing Results */}
                {!isError && !isLoading && (
                    <>
                        {products.length === 0 ? (
                            <div className="text-center py-16 bg-white border border-slate-100 rounded-3xl p-8 max-w-md mx-auto shadow-sm">
                                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-slate-800 mb-1">No Products Found</h3>
                                <p className="text-slate-500 text-sm">
                                    No products available in stock.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}

export default Products;
