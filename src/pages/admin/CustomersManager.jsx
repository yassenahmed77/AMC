import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, Phone, MessageCircle, MapPin, Building2, Search, DollarSign, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

function CustomersManager() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    async function fetchCustomers() {
        setLoading(true);
        try {
            const { data: orders, error } = await supabase
                .from('orders')
                .select('customer_name, customer_phone, customer_address, customer_governorate, clinic_name, total_price, created_at')
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Group and aggregate unique customers by phone number
            const customerMap = {};

            (orders || []).forEach(order => {
                const phone = order.customer_phone ? order.customer_phone.trim() : 'Unknown';
                const addrEntry = {
                    governorate: order.customer_governorate || 'N/A',
                    address: order.customer_address || 'N/A'
                };

                if (!customerMap[phone]) {
                    customerMap[phone] = {
                        phone,
                        name: order.customer_name || 'Anonymous Customer',
                        clinic: order.clinic_name || null,
                        addresses: [addrEntry],
                        ordersCount: 1,
                        totalSpent: Number(order.total_price) || 0,
                        lastOrderDate: order.created_at
                    };
                } else {
                    customerMap[phone].ordersCount += 1;
                    customerMap[phone].totalSpent += Number(order.total_price) || 0;
                    if (new Date(order.created_at) > new Date(customerMap[phone].lastOrderDate)) {
                        customerMap[phone].lastOrderDate = order.created_at;
                    }

                    // Deduplicate addresses based on full address & governorate string
                    const isDuplicateAddr = customerMap[phone].addresses.some(
                        a => a.address.trim().toLowerCase() === addrEntry.address.trim().toLowerCase() &&
                            a.governorate.trim().toLowerCase() === addrEntry.governorate.trim().toLowerCase()
                    );
                    if (!isDuplicateAddr && addrEntry.address.trim()) {
                        customerMap[phone].addresses.push(addrEntry);
                    }
                }
            });

            const uniqueCustomersList = Object.values(customerMap);
            setCustomers(uniqueCustomersList);
        } catch (err) {
            toast.error(err.message || 'Failed to load customer directory.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Filter customers by search query
    const filteredCustomers = customers.filter(cust => {
        const q = searchQuery.toLowerCase().trim();
        return (
            cust.name.toLowerCase().includes(q) ||
            cust.phone.toLowerCase().includes(q) ||
            cust.addresses.some(a => a.governorate.toLowerCase().includes(q) || a.address.toLowerCase().includes(q)) ||
            (cust.clinic && cust.clinic.toLowerCase().includes(q))
        );
    });

    const totalClientsCount = customers.length;
    const grandTotalRevenue = customers.reduce((acc, c) => acc + c.totalSpent, 0);

    return (
        <div className="space-y-8">
            
            {/* Header & Stats Banner - Centered on Mobile */}
            <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                        <Users className="w-5 h-5 text-maincolor shrink-0" />
                        <h2 className="text-lg sm:text-2xl font-black text-slate-800 uppercase tracking-tight">
                            Customer CRM Directory
                        </h2>
                    </div>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium max-w-lg">
                        Unique client contacts aggregated from all store orders for quick WhatsApp & phone outreach.
                    </p>
                </div>

                {/* Counter Badges - Inline Icons right next to numbers */}
                <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 shrink-0 w-full md:w-auto">
                    <div className="bg-slate-50 border border-slate-200/60 px-4 py-2 rounded-2xl text-center w-full sm:w-auto">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Total Clients</span>
                        <div className="flex items-center justify-center gap-1.5 font-mono font-black text-base text-slate-800">
                            <Users className="w-4 h-4 text-maincolor shrink-0" />
                            <span>{totalClientsCount}</span>
                        </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-2xl text-center w-full sm:w-auto">
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-0.5">Total Lifetime Spent</span>
                        <div className="flex items-center justify-center gap-1.5 font-mono font-black text-base text-emerald-700">
                            <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{grandTotalRevenue.toLocaleString()} EGP</span>
                        </div>
                    </div>

                    <button 
                        onClick={fetchCustomers}
                        className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-colors cursor-pointer flex items-center justify-center"
                        title="Refresh Directory"
                    >
                        <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
            </div>

            {/* Search Input Bar - Centered on Mobile */}
            <div className="relative max-w-md mx-auto md:mx-0 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by customer name, phone, or governorate..."
                    className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-maincolor shadow-sm transition-all"
                />
                {searchQuery && (
                    <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                    >
                        Clear
                    </button>
                )}
            </div>

            {/* Content List / Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 animate-pulse space-y-4 text-center">
                            <div className="h-5 bg-slate-100 rounded w-1/2 mx-auto"></div>
                            <div className="h-4 bg-slate-100 rounded w-3/4 mx-auto"></div>
                            <div className="h-10 bg-slate-100 rounded w-full"></div>
                        </div>
                    ))}
                </div>
            ) : filteredCustomers.length === 0 ? (
                <div className="text-center py-16 bg-white border border-slate-100 rounded-3xl p-8 max-w-md mx-auto shadow-sm">
                    <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-800 mb-1">No Customers Found</h3>
                    <p className="text-slate-500 text-xs font-medium">
                        {searchQuery ? "No matching clients found for your search." : "Customer directory will populate automatically when orders are placed."}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCustomers.map((cust, idx) => {
                        const cleanPhone = cust.phone.replace(/[^0-9]/g, '');
                        const whatsappClean = cleanPhone.startsWith('2') ? cleanPhone : `2${cleanPhone}`;

                        return (
                            <div 
                                key={idx}
                                className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                            >
                                <div className="space-y-4">
                                    {/* Name & Clinic */}
                                    <div className="flex justify-between items-start gap-2">
                                        <div>
                                            <h3 className="text-base font-black text-slate-800 leading-snug">
                                                {cust.name}
                                            </h3>
                                            {cust.clinic && (
                                                <div className="flex items-center gap-1 text-xs font-bold text-maincolor mt-1">
                                                    <Building2 size={13} />
                                                    <span>{cust.clinic}</span>
                                                </div>
                                            )}
                                        </div>

                                        <span className="text-[10px] font-black uppercase tracking-wider bg-maincolor/10 text-maincolor px-2.5 py-1 rounded-full border border-maincolor/20 shrink-0">
                                            {cust.ordersCount} {cust.ordersCount === 1 ? 'Order' : 'Orders'}
                                        </span>
                                    </div>

                                    {/* Address & Location(s) - Smart Deduplicated Display */}
                                    <div className="space-y-2 text-xs font-medium text-slate-600 bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                                        {cust.addresses.length <= 1 ? (
                                            <div className="flex items-start gap-2">
                                                <MapPin size={14} className="text-primarycolor shrink-0 mt-0.5" />
                                                <span>
                                                    <strong className="font-bold text-slate-700">{cust.addresses[0]?.governorate || 'N/A'}:</strong> {cust.addresses[0]?.address || 'No address provided'}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-[11px] font-black text-slate-700 uppercase tracking-wider">
                                                    <span className="flex items-center gap-1.5 text-maincolor">
                                                        <MapPin size={14} className="text-primarycolor shrink-0" />
                                                        Saved Addresses ({cust.addresses.length})
                                                    </span>
                                                </div>
                                                <ul className="space-y-1.5 pt-1.5 border-t border-slate-200/60 text-[11px] font-bold text-slate-600">
                                                    {cust.addresses.map((addrObj, aIdx) => (
                                                        <li key={aIdx} className="flex items-start gap-1.5">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-maincolor shrink-0 mt-1.5"></span>
                                                            <span>
                                                                <strong className="font-extrabold text-slate-800">{addrObj.governorate}:</strong> {addrObj.address}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Lifetime Spent & Last Order Date - Centered */}
                                    <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-bold border-t border-slate-100 text-center">
                                        <div className="text-center">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Spent</span>
                                            <span className="text-sm font-black text-emerald-600 font-mono">{cust.totalSpent.toLocaleString()} EGP</span>
                                        </div>

                                        <div className="text-center">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Last Order</span>
                                            <span className="text-[11px] font-bold text-slate-600">
                                                {new Date(cust.lastOrderDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Direct Actions Bar */}
                                <div className="grid grid-cols-2 gap-3 pt-6">
                                    <a 
                                        href={`tel:${cleanPhone}`}
                                        className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors duration-200"
                                    >
                                        <Phone size={14} />
                                        <span>Call</span>
                                    </a>

                                    <a 
                                        href={`https://wa.me/${whatsappClean}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-sm shadow-emerald-500/10 transition-colors duration-200"
                                    >
                                        <MessageCircle size={14} />
                                        <span>WhatsApp</span>
                                    </a>
                                </div>

                            </div>
                        );
                    })}
                </div>
            )}

        </div>
    );
}

export default CustomersManager;
