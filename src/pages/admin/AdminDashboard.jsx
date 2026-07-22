import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Login from './Login';
import OrdersList from './OrdersList';
import ProductsManager from './ProductsManager';
import CustomersManager from './CustomersManager';
import { LogOut, Package, ClipboardList, RefreshCw, UserCheck, Users } from 'lucide-react';
import toast from 'react-hot-toast';

function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'products', 'customers'
    const [adminUser, setAdminUser] = useState(null);

    async function checkUserSession() {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setIsAuthenticated(true);
                setAdminUser(session.user);
            } else {
                setIsAuthenticated(false);
                setAdminUser(null);
            }
        } catch (err) {
            setIsAuthenticated(false);
            setAdminUser(null);
        } finally {
            setLoadingAuth(false);
        }
    }

    useEffect(() => {
        checkUserSession();

        // Subscribe to auth state changes dynamically
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                setIsAuthenticated(true);
                setAdminUser(session.user);
            } else {
                setIsAuthenticated(false);
                setAdminUser(null);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

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
                        className="px-3.5 py-1.5 rounded-lg text-xs font-black bg-maincolor text-white shadow-sm hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        ), {
            duration: 8000,
            position: 'top-center'
        });
    };

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            toast.success('Logged out successfully.');
            setIsAuthenticated(false);
            setAdminUser(null);
        } catch (err) {
            toast.error(err.message || 'Logout failed.');
        }
    };

    const requestLogout = () => {
        triggerConfirmToast(
            'Are you sure you want to log out from the Admin Portal?',
            handleLogout
        );
    };

    if (loadingAuth) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/50">
                <RefreshCw className="w-10 h-10 text-maincolor animate-spin mb-4" />
                <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">Checking Session Security...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Login onLoginSuccess={checkUserSession} />;
    }

    return (
        <section className="min-h-screen bg-slate-50/50">
            {/* Admin Header / Sub-navigation */}
            <div className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-30">
                <div className="container py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    
                    {/* Navigation Tabs */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 w-full md:w-auto">
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer w-full md:w-auto ${
                                activeTab === 'orders'
                                    ? 'bg-maincolor text-white shadow-md shadow-maincolor/20'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            <ClipboardList size={15} />
                            <span>Orders Manager</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('products')}
                            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer w-full md:w-auto ${
                                activeTab === 'products'
                                    ? 'bg-maincolor text-white shadow-md shadow-maincolor/20'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            <Package size={15} />
                            <span>Products Inventory</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('customers')}
                            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer w-full md:w-auto ${
                                activeTab === 'customers'
                                    ? 'bg-maincolor text-white shadow-md shadow-maincolor/20'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            <Users size={15} />
                            <span>Customers CRM</span>
                        </button>
                    </div>

                    {/* Admin Meta & Logout */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 w-full md:w-auto mt-3 md:mt-0">
                        <div className="flex items-center justify-center gap-2 text-slate-500 text-xs font-bold bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-150 w-full md:w-auto shrink-0">
                            <UserCheck size={14} className="text-emerald-500 text-center" />
                            <span className="truncate max-w-[200px]">{adminUser?.email}</span>
                        </div>
                        
                        <button
                            onClick={requestLogout}
                            className="flex items-center justify-center gap-2 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm w-full md:w-auto shrink-0"
                            title="Log Out"
                        >
                            <LogOut size={15} />
                            <span>Logout</span>
                        </button>
                    </div>

                </div>
            </div>

            {/* Main Content Area */}
            <div className="container py-10">
                {activeTab === 'orders' ? (
                    <OrdersList />
                ) : activeTab === 'products' ? (
                    <ProductsManager />
                ) : (
                    <CustomersManager />
                )}
            </div>
        </section>
    );
}

export default AdminDashboard;
