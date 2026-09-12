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
                <p className="text-sm font-bold text-white leading-relaxed">{message}</p>
                <div className="flex justify-end gap-2">
                    <button 
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                        Discard
                    </button>
                    <button 
                        onClick={() => {
                            toast.dismiss(t.id);
                            onConfirm();
                        }}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-black bg-cyan-500 text-slate-950 shadow-sm hover:bg-cyan-400 transition-all cursor-pointer"
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
            <div className="min-h-screen flex flex-col items-center justify-center bg-transparent">
                <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
                <p className="text-cyan-200/80 font-bold text-xs uppercase tracking-widest animate-pulse">Checking Session Security...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Login onLoginSuccess={checkUserSession} />;
    }

    return (
        <section className="min-h-screen bg-transparent text-slate-100">
            {/* Admin Header / Sub-navigation */}
            <div className="bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-xl sticky top-0 z-30">
                <div className="container py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    
                    {/* Navigation Tabs */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 w-full md:w-auto">
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer w-full md:w-auto ${
                                activeTab === 'orders'
                                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 border border-white/10'
                            }`}
                        >
                            <ClipboardList size={15} />
                            <span>Orders Manager</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('products')}
                            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer w-full md:w-auto ${
                                activeTab === 'products'
                                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 border border-white/10'
                            }`}
                        >
                            <Package size={15} />
                            <span>Products Inventory</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('customers')}
                            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer w-full md:w-auto ${
                                activeTab === 'customers'
                                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 border border-white/10'
                            }`}
                        >
                            <Users size={15} />
                            <span>Customers CRM</span>
                        </button>
                    </div>

                    {/* Admin Meta & Logout */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 w-full md:w-auto mt-3 md:mt-0">
                        <div className="flex items-center justify-center gap-2 text-slate-300 text-xs font-bold bg-slate-900/70 px-4 py-2 rounded-xl border border-white/10 w-full md:w-auto shrink-0">
                            <UserCheck size={14} className="text-emerald-400 text-center" />
                            <span className="truncate max-w-[200px]">{adminUser?.email}</span>
                        </div>
                        
                        <button
                            onClick={requestLogout}
                            className="flex items-center justify-center gap-2 bg-rose-500/15 text-rose-400 hover:bg-rose-500 hover:text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm w-full md:w-auto shrink-0 border border-rose-500/20"
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
