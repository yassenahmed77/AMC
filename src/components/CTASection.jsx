import { Link } from 'react-router';
import { PhoneCall, ArrowRight } from 'lucide-react';

function CTASection() {
    return (
        <section className="py-16 bg-transparent">
            <div className="container">
                <div className="bg-slate-950/80 backdrop-blur-xl text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-cyan-500/20 flex flex-col items-center text-center gap-8">
                    
                    {/* Decorative gradient blur */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -top-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

                    {/* Content (Stacked on top) */}
                    <div className="max-w-2xl space-y-3 text-center z-10">
                        <span className="text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-3.5 py-1.5 rounded-full inline-block border border-cyan-500/30">
                            Hospital & B2B Procurement
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                            Equipping Clinics & Medical Centers Nationwide
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
                            Need bulk medical orders, clinic room setups, or custom commercial quotes? Contact our medical equipment specialists today.
                        </p>
                    </div>

                    {/* Action buttons (Stacked underneath) */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto shrink-0 z-10">
                        <Link 
                            to="/contact" 
                            className="inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all duration-300 cursor-pointer"
                        >
                            <PhoneCall size={16} />
                            <span>Contact Us Now</span>
                        </Link>

                        <Link 
                            to="/products" 
                            className="inline-flex items-center justify-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider border border-white/10 transition-all duration-300 cursor-pointer"
                        >
                            <span>Browse Products</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default CTASection;
