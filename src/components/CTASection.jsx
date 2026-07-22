import { Link } from 'react-router';
import { PhoneCall, ArrowRight } from 'lucide-react';

function CTASection() {
    return (
        <section className="py-16 bg-white">
            <div className="container">
                <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-slate-800 flex flex-col items-center text-center gap-8">
                    
                    {/* Decorative gradient blur */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -top-20 w-96 h-96 bg-maincolor/20 rounded-full blur-3xl pointer-events-none" />

                    {/* Content (Stacked on top) */}
                    <div className="max-w-2xl space-y-3 text-center z-10">
                        <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full inline-block border border-emerald-500/20">
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
                            className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/10 transition-all duration-300 cursor-pointer"
                        >
                            <PhoneCall size={16} />
                            <span>Contact Us Now</span>
                        </Link>

                        <Link 
                            to="/products" 
                            className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider border border-slate-700 transition-all duration-300 cursor-pointer"
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
