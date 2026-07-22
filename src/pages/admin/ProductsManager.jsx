import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Package, Plus, Pencil, Trash2, ShieldAlert, PlusCircle, MinusCircle, Upload, X, RefreshCw, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';

import { useQueryClient } from '@tanstack/react-query';

function ProductsManager() {
    const queryClient = useQueryClient();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoadingId, setActionLoadingId] = useState(null);

    const invalidateProductsCache = () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        queryClient.invalidateQueries({ queryKey: ['featured-products'] });
    };

    // Modal & Form States
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null); // null if adding new
    const [uploadingImage, setUploadingImage] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity: 0,
        main_image: '',
        images: []
    });

    async function fetchProducts() {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('products')
                .select('id, name, description, price, quantity, main_image, images')
                .order('name', { ascending: true });

            if (error) throw error;
            setProducts(data || []);
            invalidateProductsCache();
        } catch (err) {
            toast.error(err.message || 'Failed to fetch products.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    // Quick quantity update inline
    const handleQuickQuantityUpdate = async (productId, currentQty, increment) => {
        const newQty = Math.max(0, currentQty + increment);
        setActionLoadingId(productId);
        try {
            const { error } = await supabase
                .from('products')
                .update({ quantity: newQty })
                .eq('id', productId);

            if (error) throw error;

            setProducts(prev => prev.map(p => p.id === productId ? { ...p, quantity: newQty } : p));
            toast.success('Stock quantity updated successfully.');
        } catch (err) {
            toast.error(err.message || 'Failed to update stock.');
        } finally {
            setActionLoadingId(null);
        }
    };

    // Client-side webp compression and Supabase storage upload
    const handleImageUpload = async (e, type) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploadingImage(true);
        try {
            const options = {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
                fileType: 'image/webp'
            };

            const uploadPromises = Array.from(files).map(async (file) => {
                // Compress file to webp
                const compressedBlob = await imageCompression(file, options);
                
                const fileExt = 'webp';
                const fileName = `${Math.random().toString(36).slice(2, 9)}_${Date.now()}.${fileExt}`;
                const filePath = `product_images/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('products')
                    .upload(filePath, compressedBlob, {
                        contentType: 'image/webp',
                        cacheControl: '3600'
                    });

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('products')
                    .getPublicUrl(filePath);

                return data.publicUrl;
            });

            const uploadedUrls = await Promise.all(uploadPromises);

            if (type === 'main') {
                setFormData(prev => ({ ...prev, main_image: uploadedUrls[0] }));
                toast.success('Main image uploaded & compressed successfully.');
            } else {
                setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
                toast.success('Gallery images uploaded & compressed successfully.');
            }

        } catch (err) {
            toast.error(err.message || 'Failed to upload image.');
        } finally {
            setUploadingImage(false);
            e.target.value = ''; // Reset input
        }
    };

    const handleRemoveGalleryImage = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, idx) => idx !== indexToRemove)
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            toast.error('Product name is required.');
            return;
        }

        setActionLoadingId('submit_form');
        try {
            const payload = {
                name: formData.name.trim(),
                description: formData.description.trim() || null,
                price: formData.price ? parseFloat(formData.price) : null,
                quantity: Math.max(0, parseInt(formData.quantity) || 0),
                main_image: formData.main_image || null,
                images: formData.images
            };

            let error;
            if (editingProduct) {
                // Update
                const { error: updateError } = await supabase
                    .from('products')
                    .update(payload)
                    .eq('id', editingProduct.id);
                error = updateError;
            } else {
                // Insert new
                const { error: insertError } = await supabase
                    .from('products')
                    .insert(payload);
                error = insertError;
            }

            if (error) throw error;

            toast.success(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
            setIsFormOpen(false);
            fetchProducts();
        } catch (err) {
            toast.error(err.message || 'Failed to save product.');
        } finally {
            setActionLoadingId(null);
        }
    };

    const handleOpenEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description || '',
            price: product.price !== null ? product.price.toString() : '',
            quantity: product.quantity || 0,
            main_image: product.main_image || '',
            images: product.images || []
        });
        setIsFormOpen(true);
    };

    const handleOpenAdd = () => {
        setEditingProduct(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            quantity: 0,
            main_image: '',
            images: []
        });
        setIsFormOpen(true);
    };

    const triggerConfirmToast = (message, onConfirm) => {
        toast((t) => (
            <div className="flex flex-col gap-3 p-1 text-left">
                <p className="text-sm font-bold text-slate-800 leading-relaxed">{message}</p>
                <div className="flex justify-end gap-2">
                    <button 
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                        Discard
                    </button>
                    <button 
                        onClick={() => {
                            toast.dismiss(t.id);
                            onConfirm();
                        }}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-black bg-rose-600 text-white shadow-sm hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ), {
            duration: 8000,
            position: 'top-center'
        });
    };

    const helperExtractStorageInfo = (url) => {
        if (!url || typeof url !== 'string') return null;
        try {
            const match = url.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/);
            if (match) {
                return { bucket: match[1], path: match[2] };
            }
        } catch {
            return null;
        }
        return null;
    };

    const handleDeleteProduct = async (product) => {
        setActionLoadingId(product.id);
        try {
            // 1. Delete associated images from Supabase Storage
            const allUrls = [product.main_image, ...(product.images || [])].filter(Boolean);
            const bucketMap = {};

            allUrls.forEach((url) => {
                const info = helperExtractStorageInfo(url);
                if (info) {
                    if (!bucketMap[info.bucket]) bucketMap[info.bucket] = [];
                    bucketMap[info.bucket].push(info.path);
                }
            });

            // Remove files from storage buckets
            for (const [bucket, paths] of Object.entries(bucketMap)) {
                if (paths.length > 0) {
                    await supabase.storage.from(bucket).remove(paths);
                }
            }

            // 2. Delete row from database
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', product.id);

            if (error) throw error;

            toast.success('Product and all associated images deleted successfully.');
            setProducts(prev => prev.filter(p => p.id !== product.id));
            invalidateProductsCache();
        } catch (err) {
            toast.error(err.message || 'Failed to delete product.');
        } finally {
            setActionLoadingId(null);
        }
    };

    const requestDeleteProduct = (product) => {
        triggerConfirmToast(
            `Are you sure you want to permanently delete "${product.name}" and its storage images? This action cannot be undone.`,
            () => handleDeleteProduct(product)
        );
    };

    return (
        <div>
            {/* Header controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center text-center sm:text-left border-b border-slate-200 pb-6 mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Products Inventory</h2>
                    <p className="text-slate-500 text-sm mt-1">Manage active listings, upload compressed devices images, and edit stock quantities</p>
                </div>
                <button 
                    onClick={handleOpenAdd}
                    className="inline-flex items-center justify-center gap-2 bg-maincolor text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-maincolor/10 hover:scale-[1.02] active:scale-100 transition-all cursor-pointer w-full sm:w-auto"
                >
                    <Plus size={16} />
                    <span>Add New Product</span>
                </button>
            </div>

            {/* Content list */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <RefreshCw className="w-10 h-10 text-maincolor animate-spin mb-4" />
                    <p className="text-slate-500 font-bold text-sm">Loading products...</p>
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl p-8 max-w-md mx-auto shadow-sm">
                    <Package className="w-12 h-12 text-slate-350 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-800 mb-1">Inventory is Empty</h3>
                    <p className="text-slate-500 text-sm">No products found in the database. Click "Add New Product" to start.</p>
                </div>
            ) : (
                /* Products Table / Cards */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => {
                        const isLowStock = product.quantity !== null && product.quantity > 0 && product.quantity <= 2;
                        const isOutOfStock = product.quantity === 0 || product.quantity === null;
                        
                        return (
                            <div 
                                key={product.id} 
                                className={`group bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow duration-300 ease-out flex flex-col justify-between ${
                                    isOutOfStock 
                                        ? 'border-rose-100 bg-rose-50/5' 
                                        : isLowStock 
                                        ? 'border-amber-100 bg-amber-50/5' 
                                        : 'border-slate-100'
                                }`}
                            >
                                <div className="space-y-4">
                                    {/* Image and status badge row */}
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="w-16 h-16 bg-white p-2 rounded-xl border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                                            {product.main_image ? (
                                                <img src={product.main_image} alt={product.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out" />
                                            ) : (
                                                <Package className="text-slate-300 w-8 h-8" />
                                            )}
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                                isOutOfStock 
                                                    ? 'bg-rose-50 text-rose-600 border border-rose-100'
                                                    : isLowStock 
                                                    ? 'bg-amber-50 text-amber-600 border border-amber-100 animate-pulse'
                                                    : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                            }`}>
                                                {isOutOfStock ? 'Sold Out' : isLowStock ? 'Low Stock' : 'In Stock'}
                                            </span>
                                            <span className="text-slate-800 text-xs font-bold font-mono">
                                                {product.price ? `${product.price.toLocaleString()} EGP` : 'On Quote'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Name and description snippet */}
                                    <div>
                                        <h4 className="font-extrabold text-slate-800 text-base uppercase leading-snug line-clamp-1 group-hover:text-maincolor transition-colors duration-200">{product.name}</h4>
                                        <p className="text-slate-400 text-xs line-clamp-2 mt-1 font-medium">{product.description || 'No description provided.'}</p>
                                    </div>

                                    {/* Quick Quantity Actions */}
                                    <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 flex justify-between items-center">
                                        <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide">Stock Quantity</span>
                                        <div className="flex items-center gap-3">
                                            <button 
                                                onClick={() => handleQuickQuantityUpdate(product.id, product.quantity || 0, -1)}
                                                disabled={actionLoadingId === product.id}
                                                className="text-slate-400 hover:text-rose-500 hover:scale-110 active:scale-95 disabled:opacity-50 transition-all duration-200 cursor-pointer"
                                                title="Decrease stock"
                                            >
                                                <MinusCircle size={20} />
                                            </button>
                                            <span className="text-sm font-black text-slate-800 w-6 text-center">{product.quantity ?? 0}</span>
                                            <button 
                                                onClick={() => handleQuickQuantityUpdate(product.id, product.quantity || 0, 1)}
                                                disabled={actionLoadingId === product.id}
                                                className="text-slate-400 hover:text-emerald-500 hover:scale-110 active:scale-95 disabled:opacity-50 transition-all duration-200 cursor-pointer"
                                                title="Increase stock"
                                            >
                                                <PlusCircle size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Item Actions */}
                                <div className="flex gap-2 mt-5 pt-4 border-t border-slate-50">
                                    <button 
                                        onClick={() => requestDeleteProduct(product)}
                                        disabled={actionLoadingId !== null}
                                        className="flex-1 border border-rose-100 bg-rose-50/50 text-rose-600 hover:bg-rose-500 hover:text-white py-2 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
                                    >
                                        <Trash2 size={13} />
                                        <span>Delete</span>
                                    </button>
                                    <button 
                                        onClick={() => handleOpenEdit(product)}
                                        disabled={actionLoadingId !== null}
                                        className="flex-1 bg-slate-50 hover:bg-maincolor hover:text-white text-slate-700 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
                                    >
                                        <Pencil size={13} />
                                        <span>Edit Details</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Full Screen Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-2xl max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto relative">
                        {/* Close button */}
                        <button 
                            onClick={() => setIsFormOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-1">
                            {editingProduct ? 'Edit Product Details' : 'Add New Product Listing'}
                        </h3>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-6 border-b border-slate-100 pb-4">
                            All image files uploaded are compressed to .webp automatically
                        </p>

                        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                            {/* Product Name */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase">Product Name <span className="text-rose-500">*</span></label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="e.g. Oxygen Concentrator 5L"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-maincolor/10 focus:border-maincolor"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Price */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Price (EGP) <span className="text-rose-500">*</span></label>
                                    <input 
                                        type="number" 
                                        required
                                        value={formData.price}
                                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                                        placeholder="e.g. 15000"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-maincolor/10 focus:border-maincolor"
                                    />
                                </div>

                                {/* Stock Quantity */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Initial Stock Quantity <span className="text-rose-500">*</span></label>
                                    <input 
                                        type="number" 
                                        required
                                        min={0}
                                        value={formData.quantity}
                                        onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                                        placeholder="e.g. 5"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-maincolor/10 focus:border-maincolor"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase">Description</label>
                                <textarea 
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Enter complete technical specifications, condition, brand, features..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-maincolor/10 focus:border-maincolor"
                                />
                            </div>

                            {/* Main Image Upload */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-700 uppercase">Main Product Image <span className="text-rose-500">*</span></label>
                                <div className="flex flex-col sm:flex-row items-center gap-4 border border-dashed border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                                    <div className="w-20 h-20 bg-white p-2 rounded-xl border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                                        {formData.main_image ? (
                                            <img src={formData.main_image} alt="Preview" className="max-w-full max-h-full object-contain" />
                                        ) : (
                                            <Upload className="text-slate-350 w-6 h-6" />
                                        )}
                                    </div>
                                    <div className="flex-grow w-full text-center sm:text-left">
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            disabled={uploadingImage}
                                            onChange={(e) => handleImageUpload(e, 'main')}
                                            className="hidden" 
                                            id="main-image-file-input"
                                        />
                                        <label 
                                            htmlFor="main-image-file-input"
                                            className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-black uppercase text-slate-700 shadow-sm cursor-pointer hover:bg-slate-50 active:scale-95 transition-all"
                                        >
                                            {uploadingImage ? 'Processing...' : 'Upload & Compress'}
                                        </label>
                                        <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">Webp compression happens client side automatically</p>
                                    </div>
                                </div>
                            </div>

                            {/* Gallery Images Upload */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-700 uppercase">Real Life Gallery Images <span className="text-slate-400 font-medium normal-case">(Optional - displayed f details slider)</span></label>
                                <div className="border border-dashed border-slate-200 rounded-2xl p-4 bg-slate-50/50 flex flex-col gap-4">
                                    <div className="flex flex-wrap gap-3">
                                        {formData.images?.map((url, idx) => (
                                            <div key={idx} className="relative w-16 h-16 bg-white p-1 rounded-xl border border-slate-150 flex items-center justify-center overflow-hidden group">
                                                <img src={url} alt="Gallery Preview" className="max-w-full max-h-full object-contain" />
                                                <button 
                                                    type="button"
                                                    onClick={() => handleRemoveGalleryImage(idx)}
                                                    className="absolute top-0.5 right-0.5 bg-rose-500 text-white rounded-full p-0.5 hover:bg-rose-600 transition-colors shadow cursor-pointer opacity-0 group-hover:opacity-100"
                                                >
                                                    <X size={10} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            multiple
                                            disabled={uploadingImage}
                                            onChange={(e) => handleImageUpload(e, 'gallery')}
                                            className="hidden" 
                                            id="gallery-images-file-input"
                                        />
                                        <label 
                                            htmlFor="gallery-images-file-input"
                                            className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-black uppercase text-slate-700 shadow-sm cursor-pointer hover:bg-slate-50 active:scale-95 transition-all"
                                        >
                                            {uploadingImage ? 'Processing...' : 'Upload Gallery Photos'}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Panel */}
                            <div className="flex gap-3 justify-end border-t border-slate-100 pt-5 mt-3">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={actionLoadingId !== null || uploadingImage}
                                    className="bg-maincolor text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md shadow-maincolor/10 hover:scale-[1.02] active:scale-100 transition-all cursor-pointer disabled:opacity-50"
                                >
                                    {actionLoadingId === 'submit_form' ? 'Saving Listing...' : editingProduct ? 'Save Product' : 'Add Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductsManager;
