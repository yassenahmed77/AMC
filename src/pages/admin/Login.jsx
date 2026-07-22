import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Lock, Mail, RefreshCw, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password
            });

            if (authError) throw authError;

            toast.success('Welcome back, Admin!');
            onLoginSuccess();
        } catch (err) {
            const errMsg = err.message || 'Invalid email or password.';
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-[85vh] flex items-center justify-center py-16 px-4 bg-slate-50/30">
            <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-xl max-w-md w-full relative overflow-hidden">
                {/* Decorative medical line */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-maincolor to-primarycolor" />

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-maincolor/5 text-maincolor rounded-2xl flex items-center justify-center mx-auto mb-4 border border-maincolor/10">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Admin Portal</h2>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1">Authorized Access Only</p>
                </div>

                {error && (
                    <div className="bg-rose-50 border border-rose-100 text-rose-600 rounded-xl p-4 mb-6 flex gap-2.5 text-sm font-semibold leading-relaxed">
                        <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    {/* Email Input */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                <Mail size={16} />
                            </span>
                            <input 
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@amc-store.com"
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-maincolor/10 focus:border-maincolor"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                <Lock size={16} />
                            </span>
                            <input 
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-maincolor/10 focus:border-maincolor"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-maincolor text-white font-bold uppercase py-3.5 rounded-xl shadow-lg shadow-maincolor/20 hover:bg-maincolor/90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 mt-2"
                    >
                        {loading ? (
                            <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>Authenticating...</span>
                            </>
                        ) : (
                            <span>Login to Dashboard</span>
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Login;
