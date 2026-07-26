import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import { ArrowLeft, CheckCircle2, ShieldAlert, ShoppingBag, PhoneCall, Building2, MapPin, User } from 'lucide-react';
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
        // Clear error when typing
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

        // Egyptian phone number regex or simple length validation
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
        if (cartItems.length === 0) {
            toast.error('Your cart is empty.');
            return;
        }

        if (!validateForm()) {
            toast.error('Please correct the validation errors in the form.');
            return;
        }

        setLoading(true);
        try {
            // Prepare order items payload
            const orderItems = cartItems.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }));

            const { error } = await supabase
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
                });

            if (error) throw error;

            // Trigger instant Telegram notification to store owner / group ONLY on database success
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
            `السلام عليكم، قمت بإرسال طلب عرض سعر جديد عبر الموقع:\n` +
            `• الاسم: ${formData.customerName}\n` +
            `• رقم الهاتف: ${formData.customerPhone}\n` +
            `• العيادة/المستشفى: ${formData.clinicName || 'غير محدد'}\n` +
            `• المحافظة: ${formData.customerGovernorate}`
        );

        return (
            <section className="min-h-screen bg-slate-50/50 py-16 flex items-center justify-center">
                <div className="container px-4 flex justify-center">
                    <div className="flex flex-col items-center justify-center py-16 px-6 sm:px-12 bg-white rounded-3xl border border-slate-100 shadow-xl text-center max-w-2xl w-full relative overflow-hidden">
                        <div className="w-24 h-24 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 border border-emerald-100 shadow-sm relative z-10">
                            <CheckCircle2 size={48} className="animate-pulse text-emerald-500" />
                        </div>
                        
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-tight mb-4 uppercase">
                            تم استلام طلب العرض بنجاح!
                        </h1>

                        <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-6 text-right max-w-md w-full my-6 flex gap-4">
                            <PhoneCall className="w-6 h-6 text-maincolor shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-bold text-maincolor text-sm uppercase mb-1">ماذا يحدث الآن؟</h3>
                                <p className="text-slate-700 text-xs leading-relaxed font-semibold">
                                    تم تسجيل طلبك بنجاح، وسيقوم أحد ممثلي المبيعات بالتواصل معكم هاتفياً في أقرب وقت على الرقم 
                                    <span className="font-bold text-maincolor dir-ltr inline-block mx-1"> {formData.customerPhone} </span> 
                                    لتأكيد السعر النهائي وتأكيد الطلب وخصومات الكميات المتاحة.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                            <a 
                                href={`https://wa.me/201005183039?text=${whatsappOrderMsg}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 hover:shadow-xl transition-all duration-300 cursor-pointer"
                            >
                                <span>متابعة الطلب عبر الواتساب فوراً 💬</span>
                            </a>
                            <Link 
                                to="/products" 
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer shrink-0"
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
            <section className="min-h-screen bg-slate-50/50 py-16 flex items-center justify-center">
                <div className="container text-center">
                    <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-md mx-auto">
                        <ShoppingBag size={48} className="text-slate-300 mb-4" />
                        <h2 className="text-xl font-bold text-slate-800 uppercase">Cart is Empty</h2>
                        <p className="text-slate-500 text-sm mt-2">Add items to your cart before checking out.</p>
                        <Link to="/products" className="bg-maincolor text-white px-6 py-2.5 rounded-xl font-bold mt-6 shadow-md hover:bg-maincolor/90 transition-all cursor-pointer">
                            Browse Products
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-slate-50/50 py-12">
            <div className="container">
                {/* Back Button */}
                <div className="mb-8">
                    <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors group">
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        <span>Back to Cart</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-1">Shipping & Contact Details</h1>
                        <p className="text-slate-400 text-xs font-semibold mb-8 uppercase tracking-wider">Please fill in your authentic information</p>

                        <form onSubmit={handlePlaceOrder} className="flex flex-col gap-6">
                            
                            {/* Customer Name */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                                    <User size={14} className="text-slate-400" />
                                    Full Name <span className="text-rose-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 text-sm font-semibold transition-all focus:outline-none focus:ring-2 ${
                                        errors.customerName 
                                            ? 'border-rose-300 focus:ring-rose-200 focus:border-rose-500' 
                                            : 'border-slate-200 focus:ring-maincolor/10 focus:border-maincolor'
                                    }`}
                                />
                                {errors.customerName && (
                                    <span className="text-rose-500 text-xs font-bold flex items-center gap-1">
                                        <ShieldAlert size={12} /> {errors.customerName}
                                    </span>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                                    <PhoneCall size={14} className="text-slate-400" />
                                    Phone Number <span className="text-rose-500">*</span>
                                </label>
                                <input 
                                    type="tel" 
                                    name="customerPhone"
                                    value={formData.customerPhone}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 01012345678"
                                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 text-sm font-semibold transition-all focus:outline-none focus:ring-2 ${
                                        errors.customerPhone 
                                            ? 'border-rose-300 focus:ring-rose-200 focus:border-rose-500' 
                                            : 'border-slate-200 focus:ring-maincolor/10 focus:border-maincolor'
                                    }`}
                                />
                                {errors.customerPhone && (
                                    <span className="text-rose-500 text-xs font-bold flex items-center gap-1">
                                        <ShieldAlert size={12} /> {errors.customerPhone}
                                    </span>
                                )}
                            </div>

                            {/* Clinic/Hospital Name (Optional) */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                                    <Building2 size={14} className="text-slate-400" />
                                    Clinic / Hospital Name <span className="text-slate-400 font-medium normal-case">(Optional)</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="clinicName"
                                    value={formData.clinicName}
                                    onChange={handleInputChange}
                                    placeholder="Enter clinic or hospital name if applicable"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-maincolor/10 focus:border-maincolor"
                                />
                            </div>

                            {/* Governorate Selection */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                                    <MapPin size={14} className="text-slate-400" />
                                    Governorate <span className="text-rose-500">*</span>
                                </label>
                                <select 
                                    name="customerGovernorate"
                                    value={formData.customerGovernorate}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 text-sm font-semibold transition-all focus:outline-none focus:ring-2 ${
                                        errors.customerGovernorate 
                                            ? 'border-rose-300 focus:ring-rose-200 focus:border-rose-500' 
                                            : 'border-slate-200 focus:ring-maincolor/10 focus:border-maincolor'
                                    }`}
                                >
                                    <option value="">-- Select Governorate --</option>
                                    {GOVERNORATES.map((gov) => (
                                        <option key={gov} value={gov}>{gov}</option>
                                    ))}
                                </select>
                                {errors.customerGovernorate && (
                                    <span className="text-rose-500 text-xs font-bold flex items-center gap-1">
                                        <ShieldAlert size={12} /> {errors.customerGovernorate}
                                    </span>
                                )}
                            </div>

                            {/* Address Details */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                                    <MapPin size={14} className="text-slate-400" />
                                    Detailed Address <span className="text-rose-500">*</span>
                                </label>
                                <textarea 
                                    name="customerAddress"
                                    value={formData.customerAddress}
                                    onChange={handleInputChange}
                                    rows={4}
                                    placeholder="Enter street name, building number, apartment, floor, landmark..."
                                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 text-sm font-semibold transition-all focus:outline-none focus:ring-2 ${
                                        errors.customerAddress 
                                            ? 'border-rose-300 focus:ring-rose-200 focus:border-rose-500' 
                                            : 'border-slate-200 focus:ring-maincolor/10 focus:border-maincolor'
                                    }`}
                                />
                                {errors.customerAddress && (
                                    <span className="text-rose-500 text-xs font-bold flex items-center gap-1">
                                        <ShieldAlert size={12} /> {errors.customerAddress}
                                    </span>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-maincolor text-white font-bold uppercase py-4 rounded-xl shadow-lg shadow-maincolor/30 hover:bg-maincolor/90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer mt-4 text-center text-sm ${
                                    loading ? 'opacity-80 cursor-not-allowed' : ''
                                }`}
                            >
                                {loading ? 'Submitting Order...' : 'Place Order'}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary Panel */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-6 sticky top-28">
                        <h2 className="font-extrabold text-slate-800 text-lg uppercase border-b border-slate-100 pb-4">Items In Order</h2>
                        
                        <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-1">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 items-center justify-between">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-12 h-12 bg-white rounded-lg border border-slate-100 p-1 flex items-center justify-center shrink-0">
                                            <img src={item.main_image} alt={item.name} className="max-w-full max-h-full object-contain" />
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <h4 className="font-bold text-slate-800 text-sm truncate uppercase">{item.name}</h4>
                                            <span className="text-slate-400 text-xs font-semibold block">Qty: {item.quantity}</span>
                                        </div>
                                    </div>
                                    {item.price ? (
                                        <span className="text-slate-800 text-xs font-bold shrink-0 font-mono">
                                            {(item.price * item.quantity).toLocaleString()} EGP
                                        </span>
                                    ) : null}
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-4 border-t border-slate-100 pt-4">
                            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                <span className="text-xs font-bold text-slate-700 uppercase">Pricing Status</span>
                                <span className="text-xs font-bold text-maincolor bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                                    التواصل المباشر للتسعير
                                </span>
                            </div>

                            <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 flex flex-col gap-1.5">
                                <span className="text-xs font-bold text-maincolor flex items-center gap-1.5">
                                    📞 التواصل والتأكيد الفوري
                                </span>
                                <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                                    سيتم التواصل معك هاتفياً أو عبر الواتساب فور إرسال الطلب لتأكيد الأسعار، المعاينة، ومصاريف الشحن لمحافظتك.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Checkout;
