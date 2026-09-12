import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import { ArrowLeft, CheckCircle2, ShieldAlert, ShoppingBag, PhoneCall, Building2, MapPin, User, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendOrderNotificationToTelegram } from '../services/telegramService';

const GOVERNORATES = [
    'Cairo (القاهرة)',
    'Giza (الجيزة)',
    'Alexandria (الإسكندرية)',
    'Qalyubia (القليوبية)',
    'Sharqia (الشرقية)',
    'Dakahlia (الدقهلية)',
    'Beheira (البحيرة)',
    'Gharbia (الغربية)',
    'Monufia (المنوفية)',
    'Fayoum (الفيوم)',
    'Beni Suef (بني سويف)',
    'Minya (المنيا)',
    'Assiut (أسيوط)',
    'Sohag (سوهاج)',
    'Qena (قنا)',
    'Luxor (الأقصر)',
    'Aswan (أسوان)',
    'Suez (السويس)',
    'Ismailia (الإسماعيلية)',
    'Port Said (بورسعيد)',
    'Damietta (دمياط)',
    'Red Sea (البحر الأحمر)',
    'South Sinai (جنوب سيناء)',
    'North Sinai (شمال سيناء)',
    'Matrouh (مطروح)',
    'New Valley (الوادي الجديد)'
];

function Checkout() {
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [orderId, setOrderId] = useState('');

    const [formData, setFormData] = useState({
        customerName: '',
        customerPhone: '',
        clinicName: '',
        customerGovernorate: '',
        customerAddress: ''
    });

    const [errors, setErrors] = useState({});

    const subtotal = cartItems.reduce((acc, item) => {
        return acc + ((Number(item.price) || 0) * item.quantity);
    }, 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.customerName.trim()) {
            newErrors.customerName = 'Full name is required';
        } else if (formData.customerName.trim().length < 3) {
            newErrors.customerName = 'Name must be at least 3 characters';
        }

        const cleanPhone = formData.customerPhone.trim();
        const phoneRegex = /^01[0125][0-9]{8}$/;
        if (!cleanPhone) {
            newErrors.customerPhone = 'Phone number is required';
        } else if (!phoneRegex.test(cleanPhone)) {
            newErrors.customerPhone = 'Please enter a valid Egyptian phone number (e.g. 01012345678)';
        }

        if (!formData.customerGovernorate) {
            newErrors.customerGovernorate = 'Please select your governorate';
        }

        if (!formData.customerAddress.trim()) {
            newErrors.customerAddress = 'Address is required';
        } else if (formData.customerAddress.trim().length < 10) {
            newErrors.customerAddress = 'Please provide a more detailed address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        try {
            const orderItems = cartItems.map(item => ({
                product_id: item.id,
                name: item.name,
                price: Number(item.price) || 0,
                quantity: item.quantity,
                image: item.main_image || item.image || item.images?.[0] || null
            }));

            const { data, error } = await supabase
                .from('orders')
                .insert({
                    customer_name: formData.customerName.trim(),
                    customer_phone: formData.customerPhone.trim(),
                    customer_address: formData.customerAddress.trim(),
                    customer_governorate: formData.customerGovernorate,
                    clinic_name: formData.clinicName.trim() || null,
                    items: orderItems,
                    total_price: subtotal,
                    status: 'pending'
                })
                .select('id')
                .single();

            if (error) throw error;

            if (data?.id) {
                setOrderId(data.id);
            }

            // Telegram notification
            sendOrderNotificationToTelegram({
                customer_name: formData.customerName.trim(),
                customer_phone: formData.customerPhone.trim(),
                customer_address: formData.customerAddress.trim(),
                customer_governorate: formData.customerGovernorate,
                clinic_name: formData.clinicName.trim() || null,
                items: orderItems,
                total_price: subtotal
            });

            setSuccess(true);
            clearCart();
            toast.success('Order placed successfully!');
        } catch (err) {
            console.error('Checkout submit error:', err);
            toast.error(err.message || 'Failed to place the order.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        const whatsappOrderMsg = encodeURIComponent(
            `السلام عليكم، قمت بإرسال طلب جديد عبر الموقع:\n` +
            `• الاسم: ${formData.customerName}\n` +
            `• رقم الهاتف: ${formData.customerPhone}\n` +
            `• العيادة/المستشفى: ${formData.clinicName || 'غير محدد'}\n` +
            `• المحافظة: ${formData.customerGovernorate}`
        );

        return (
            <section className="min-h-screen bg-transparent py-16 flex items-center justify-center">
                <div className="container px-4 flex justify-center">
                    <div className="flex flex-col items-center justify-center py-16 px-6 sm:px-12 bg-slate-900/85 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl text-center max-w-2xl w-full relative overflow-hidden">
                        <div className="w-24 h-24 bg-emerald-500/20 rounded-3xl flex items-center justify-center text-emerald-400 mb-8 border border-emerald-500/30 shadow-lg shadow-emerald-500/20 relative z-10 animate-bounce">
                            <CheckCircle2 size={48} className="text-emerald-400" />
                        </div>
                        
                        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-4 uppercase">
                            تم استلام طلبك بنجاح!
                        </h1>

                        <div className="bg-cyan-950/50 border border-cyan-500/30 rounded-2xl p-6 text-right max-w-md w-full my-6 flex gap-4 backdrop-blur-md">
                            <PhoneCall className="w-6 h-6 text-cyan-400 shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-bold text-cyan-300 text-sm uppercase mb-1">ماذا يحدث الآن؟</h3>
                                <p className="text-slate-200 text-xs leading-relaxed font-medium">
                                    تم تسجيل طلبك بنجاح، وسيقوم أحد مهندسينا وممثلينا بالتواصل معكم هاتفياً في أقرب وقت على الرقم 
                                    <span className="font-bold text-cyan-400 dir-ltr inline-block mx-1"> {formData.customerPhone} </span> 
                                    لتأكيد السعر وتفاصيل التوريد والضمان.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                            <a 
                                href={`https://wa.me/201005183039?text=${whatsappOrderMsg}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/25 transition-all duration-300 cursor-pointer"
                            >
                                <span>متابعة الطلب عبر الواتساب فوراً</span>
                            </a>
                            <Link 
                                to="/products" 
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer shrink-0 border border-white/10"
                            >
                                <span>الرئيسية</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-transparent py-20 flex items-center justify-center">
                <div className="container px-4 text-center max-w-md">
                    <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">
                        <ShoppingBag size={48} className="mx-auto text-cyan-400 mb-4 animate-bounce" />
                        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Cart is Empty</h2>
                        <p className="text-slate-400 text-sm mb-6">Please add items to your cart before proceeding to checkout.</p>
                        <Link 
                            to="/products"
                            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 rounded-xl font-black transition-all shadow-lg shadow-cyan-500/25 uppercase text-xs tracking-wider"
                        >
                            <span>Browse Store</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-transparent py-10 sm:py-16">
            <div className="container">
                <div className="mb-8">
                    <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors group">
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        <span>Back to Cart</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2 bg-slate-900/75 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl text-white">
                        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-1">Shipping & Contact Details</h1>
                        <p className="text-slate-400 text-xs font-semibold mb-8 uppercase tracking-wider">Please fill in your authentic clinical information</p>

                        <form onSubmit={handlePlaceOrder} className="flex flex-col gap-6">
                            
                            {/* Customer Name */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                                    <User size={14} className="text-cyan-400" />
                                    Full Name <span className="text-rose-400">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className={`w-full px-4 py-3.5 rounded-xl border bg-slate-950/70 text-white text-sm font-semibold transition-all focus:outline-none focus:ring-2 placeholder-slate-500 ${
                                        errors.customerName 
                                            ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-400' 
                                            : 'border-white/15 focus:ring-cyan-400/20 focus:border-cyan-400'
                                    }`}
                                />
                                {errors.customerName && (
                                    <span className="text-rose-400 text-xs font-bold flex items-center gap-1">
                                        <ShieldAlert size={12} /> {errors.customerName}
                                    </span>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                                    <PhoneCall size={14} className="text-cyan-400" />
                                    Phone Number <span className="text-rose-400">*</span>
                                </label>
                                <input 
                                    type="tel" 
                                    name="customerPhone"
                                    value={formData.customerPhone}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 01012345678"
                                    className={`w-full px-4 py-3.5 rounded-xl border bg-slate-950/70 text-white text-sm font-semibold transition-all focus:outline-none focus:ring-2 placeholder-slate-500 ${
                                        errors.customerPhone 
                                            ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-400' 
                                            : 'border-white/15 focus:ring-cyan-400/20 focus:border-cyan-400'
                                    }`}
                                />
                                {errors.customerPhone && (
                                    <span className="text-rose-400 text-xs font-bold flex items-center gap-1">
                                        <ShieldAlert size={12} /> {errors.customerPhone}
                                    </span>
                                )}
                            </div>

                            {/* Clinic/Hospital Name (Optional) */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                                    <Building2 size={14} className="text-cyan-400" />
                                    Clinic / Hospital Name <span className="text-slate-500 font-medium normal-case">(Optional)</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="clinicName"
                                    value={formData.clinicName}
                                    onChange={handleInputChange}
                                    placeholder="Enter clinic or hospital name if applicable"
                                    className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-slate-950/70 text-white text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/20 focus:border-cyan-400 placeholder-slate-500"
                                />
                            </div>

                            {/* Governorate Selection */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                                    <MapPin size={14} className="text-cyan-400" />
                                    Governorate <span className="text-rose-400">*</span>
                                </label>
                                <select 
                                    name="customerGovernorate"
                                    value={formData.customerGovernorate}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3.5 rounded-xl border bg-slate-950/90 text-white text-sm font-semibold transition-all focus:outline-none focus:ring-2 ${
                                        errors.customerGovernorate 
                                            ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-400' 
                                            : 'border-white/15 focus:ring-cyan-400/20 focus:border-cyan-400'
                                    }`}
                                >
                                    <option value="" className="bg-slate-900 text-slate-400">-- Select Governorate --</option>
                                    {GOVERNORATES.map((gov) => (
                                        <option key={gov} value={gov} className="bg-slate-900 text-white">{gov}</option>
                                    ))}
                                </select>
                                {errors.customerGovernorate && (
                                    <span className="text-rose-400 text-xs font-bold flex items-center gap-1">
                                        <ShieldAlert size={12} /> {errors.customerGovernorate}
                                    </span>
                                )}
                            </div>

                            {/* Detailed Address */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                                    <MapPin size={14} className="text-cyan-400" />
                                    Detailed Street / Clinic Address <span className="text-rose-400">*</span>
                                </label>
                                <textarea 
                                    name="customerAddress"
                                    rows="3"
                                    value={formData.customerAddress}
                                    onChange={handleInputChange}
                                    placeholder="Enter street name, building number, clinic floor/room number..."
                                    className={`w-full px-4 py-3.5 rounded-xl border bg-slate-950/70 text-white text-sm font-semibold transition-all focus:outline-none focus:ring-2 placeholder-slate-500 resize-none ${
                                        errors.customerAddress 
                                            ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-400' 
                                            : 'border-white/15 focus:ring-cyan-400/20 focus:border-cyan-400'
                                    }`}
                                />
                                {errors.customerAddress && (
                                    <span className="text-rose-400 text-xs font-bold flex items-center gap-1">
                                        <ShieldAlert size={12} /> {errors.customerAddress}
                                    </span>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase py-4 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 mt-2 tracking-wider text-sm sm:text-base"
                            >
                                {loading ? (
                                    <>
                                        <RefreshCw size={18} className="animate-spin text-slate-950" />
                                        <span>Submitting Order...</span>
                                    </>
                                ) : (
                                    <span>Confirm & Place Order</span>
                                )}
                            </button>

                        </form>
                    </div>

                    {/* Order Items Overview */}
                    <div className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl text-white sticky top-28 flex flex-col gap-6">
                        <h2 className="font-black text-white text-lg uppercase tracking-tight border-b border-white/10 pb-4">Order Summary</h2>
                        
                        <div className="flex flex-col gap-4 max-h-80 overflow-y-auto pr-1">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-3 border-b border-white/5 pb-3">
                                    <div className="w-14 h-14 bg-slate-950/80 rounded-xl p-1.5 border border-white/10 shrink-0 flex items-center justify-center overflow-hidden">
                                        <img 
                                            src={item.main_image || item.image || item.images?.[0] || '/logo.png'} 
                                            alt={item.name} 
                                            className="max-w-full max-h-full object-contain" 
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = '/logo.png';
                                            }}
                                        />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <h4 className="text-xs font-bold text-white uppercase truncate">{item.name}</h4>
                                        <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
                                            <span>Qty: {item.quantity}</span>
                                            {item.price ? (
                                                <span className="font-bold text-cyan-400">{(item.price * item.quantity).toLocaleString()} EGP</span>
                                            ) : (
                                                <span className="font-bold text-slate-400">Negotiable</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-slate-400 uppercase">Items Count</span>
                                <span className="text-white font-mono">{cartItems.reduce((acc, i) => acc + i.quantity, 0)} units</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-black text-cyan-400 pt-2 border-t border-white/5">
                                <span>Estimated Total</span>
                                <span className="text-base font-mono">{subtotal > 0 ? `${subtotal.toLocaleString()} EGP` : 'Negotiable (تواصل مباشر)'}</span>
                            </div>
                        </div>

                        <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-xl p-3.5 text-xs text-cyan-200 leading-relaxed font-medium text-center sm:text-right">
                            يتم التواصل هاتفياً لتأكيد التسليم.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Checkout;
