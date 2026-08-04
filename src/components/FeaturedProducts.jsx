import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { supabase } from '../lib/supabase';
import ProductCard from '../pages/products/ProductCard';
import ProductCardSkeleton from '../pages/products/ProductCardSkeleton';
import { ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

async function fetchFeaturedProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('id, name, price, main_image, quantity')
        .order('created_at', { ascending: false })
        .limit(8);

    if (error) throw error;
    return data || [];
}

function FeaturedProducts() {
    const { data: featured = [], isLoading } = useQuery({
        queryKey: ['featured-products'],
        queryFn: fetchFeaturedProducts,
        onError: (err) => {
            toast.error(err.message || 'Failed to load featured products.');
        }
    });

    return (
        <section className="py-20 bg-white">
            <div className="container">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                    <div className="text-center sm:text-left space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-maincolor bg-blue-50 px-3 py-1 rounded-md inline-block border border-blue-100/80 mb-1">
                            Medical Supplies & Devices
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                            Featured Products
                        </h2>
                        <p className="text-slate-500 text-sm font-normal max-w-lg leading-relaxed">
                            Certified, high-performance medical devices trusted by clinics, hospitals, and homecare patients.
                        </p>
                    </div>

                    <div className="flex items-center justify-center sm:justify-end shrink-0">
                        <Link 
                            to="/products" 
                            className="group inline-flex items-center gap-1.5 text-maincolor hover:text-primarycolor font-bold text-sm sm:text-base transition-colors duration-300 whitespace-nowrap cursor-pointer"
                        >
                            <span>View All Products</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>

                {/* Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                ) : featured.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100 max-w-md mx-auto">
                        <p className="text-slate-500 font-bold">No products available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featured.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default FeaturedProducts;
