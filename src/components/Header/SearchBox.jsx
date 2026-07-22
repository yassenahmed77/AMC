import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../lib/supabase';
import { Search, X, RefreshCw, ShoppingBag, ArrowRight, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

function SearchBox({ searchBarOpen, setSearchBarOpen }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const modalRef = useRef(null);
    const navigate = useNavigate();

    // Auto-focus input when search opens
    useEffect(() => {
        if (searchBarOpen) {
            setQuery('');
            setResults([]);
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [searchBarOpen]);

    // Handle Escape key press to close search
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && searchBarOpen) {
                setSearchBarOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [searchBarOpen, setSearchBarOpen]);

    // Debounced search query to Supabase
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        const searchTimer = setTimeout(async () => {
            try {
                const cleanQ = query.trim();
                const { data, error } = await supabase
                    .from('products')
                    .select('id, name, price, main_image, quantity')
                    .or(`name.ilike.%${cleanQ}%,description.ilike.%${cleanQ}%`)
                    .limit(8);

                if (error) throw error;
                setResults(data || []);
            } catch (err) {
                toast.error(err.message || 'Search failed.');
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(searchTimer);
    }, [query]);

    if (!searchBarOpen) return null;

    const handleSelectProduct = (productId) => {
        setSearchBarOpen(false);
        navigate(`/products/${productId}`);
    };

    return (
        <div 
            onClick={() => setSearchBarOpen(false)}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex flex-col items-center pt-12 sm:pt-20 px-4 transition-all duration-300 animate-in fade-in"
        >
            {/* Modal Container */}
            <div 
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col transition-all duration-300 animate-in zoom-in-95"
            >
                
                {/* Search Bar Header */}
                <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 relative bg-slate-50/50">
                    <div className="w-10 h-10 rounded-2xl bg-maincolor/10 text-maincolor flex items-center justify-center shrink-0">
                        <Search className="w-5 h-5" />
                    </div>
                    
                    <input 
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search medical equipment, devices..."
                        className="w-full text-base sm:text-lg font-extrabold text-slate-800 placeholder:text-slate-400 placeholder:font-medium bg-transparent focus:outline-none"
                    />

                    {query && (
                        <button 
                            onClick={() => setQuery('')}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                            title="Clear search"
                        >
                            <X size={16} />
                        </button>
                    )}

                    <button 
                        onClick={() => setSearchBarOpen(false)}
                        className="ml-1 p-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 transition-colors cursor-pointer shrink-0"
                        title="Close search"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Results Section */}
                <div className="max-h-[65vh] overflow-y-auto p-4 sm:p-6">
                    {/* Empty Query Hint */}
                    {!query.trim() && (
                        <div className="text-center py-10 text-slate-400">
                            <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                            <p className="text-sm font-bold text-slate-700">Search Products</p>
                            <p className="text-xs text-slate-400 mt-1">Type product name or keyword</p>
                        </div>
                    )}

                    {/* Loading State */}
                    {query.trim() && loading && (
                        <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-400">
                            <RefreshCw className="w-8 h-8 animate-spin text-maincolor" />
                            <span className="text-xs font-bold uppercase tracking-wider">Searching medical products...</span>
                        </div>
                    )}

                    {/* No Results Found */}
                    {query.trim() && !loading && results.length === 0 && (
                        <div className="text-center py-10 px-4">
                            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-2" />
                            <h4 className="text-base font-black text-slate-800 uppercase tracking-tight">No Devices Match "{query}"</h4>
                            <p className="text-slate-400 text-xs mt-1 font-medium">Try broader keywords or verify product spelling.</p>
                        </div>
                    )}

                    {/* Search Results List */}
                    {query.trim() && !loading && results.length > 0 && (
                        <div className="flex flex-col gap-2.5">
                            <div className="flex justify-between items-center px-1 mb-1">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    Matching Products ({results.length})
                                </span>
                            </div>

                            {results.map((product) => {
                                const isOutOfStock = product.quantity === 0 || product.quantity === null;
                                return (
                                    <div 
                                        key={product.id}
                                        onClick={() => handleSelectProduct(product.id)}
                                        className="group p-3 rounded-2xl border border-slate-100 hover:border-maincolor/30 hover:bg-slate-50 transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 shadow-2xs hover:shadow-md"
                                    >
                                        <div className="flex items-center gap-3.5 min-w-0">
                                            <div className="w-13 h-13 bg-white rounded-xl border border-slate-150 p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-inner group-hover:border-maincolor/30 transition-colors">
                                                {product.main_image ? (
                                                    <img src={product.main_image} alt={product.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                                                ) : (
                                                    <ShoppingBag className="text-slate-300 w-6 h-6" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-extrabold text-slate-800 text-sm uppercase truncate group-hover:text-maincolor transition-colors">
                                                    {product.name}
                                                </h4>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                                        isOutOfStock 
                                                            ? 'bg-rose-50 text-rose-600 border border-rose-100'
                                                            : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                                    }`}>
                                                        {isOutOfStock ? 'Sold Out' : 'In Stock'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className="text-slate-800 text-xs font-black font-mono">
                                                {product.price ? `${product.price.toLocaleString()} EGP` : 'On Quote'}
                                            </span>
                                            <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-maincolor group-hover:text-white text-slate-500 flex items-center justify-center transition-all duration-200">
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchBox;