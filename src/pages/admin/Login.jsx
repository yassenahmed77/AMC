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
        <section className="min-h-[85vh] flex items-center justify-center py-16 px-4 bg-transparent">
            <div className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 sm:p-10 shadow-2xl max-w-md w-full relative overflow-hidden text-white">
                {/* Decorative medical cyan accent line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500" />

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-cyan-950/60 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-cyan-500/30 shadow-lg shadow-cyan-950/50">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight">Admin Portal</h2>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1">Authorized Medical Staff Only</p>
                </div>

                {error && (
                    <div className="bg-rose-500/15 border border-rose-500/30 text-rose-300 rounded-xl p-4 mb-6 flex gap-2.5 text-sm font-semibold leading-relaxed">
                        <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    {/* Email Input */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Email Address</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-cyan-400">
                                <Mail size={16} />
                            </span>
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@amc-store.com"
                                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/15 bg-slate-950/70 text-white text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/20 focus:border-cyan-400 placeholder-slate-500"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-cyan-400">
                                <Lock size={16} />
                            </span>
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/15 bg-slate-950/70 text-white text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/20 focus:border-cyan-400 placeholder-slate-500"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase py-4 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 mt-2 tracking-wider text-xs sm:text-sm"
                    >
                        {loading ? (
                            <>
                                <RefreshCw size={16} className="animate-spin text-slate-950" />
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <span>Access Admin Panel ➔</span>
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Login;
