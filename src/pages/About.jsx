import { Link } from 'react-router';
import { ShieldCheck, Truck, Wrench, HeartHandshake, ArrowRight, CheckCircle2 } from 'lucide-react';
import TrustedSupplierCard from '../components/TrustedSupplierCard';

function About() {
    return (
        <section className="py-12 sm:py-20 min-h-screen bg-transparent">
            <div className="container">
                
                {/* Header Banner */}
                <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                    <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-tight">
                        About AMC Medical Equipment
                    </h1>
                    <p className="text-slate-400 text-sm mt-3 font-medium leading-relaxed">
                        Delivering certified, tested medical devices and homecare solutions to hospitals, clinics, and families across Egypt.
                    </p>
                </div>

                {/* Main Story & Visual Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
                    
                    {/* Left Column: Visual Card */}
                    <div className="lg:col-span-5">
                        <TrustedSupplierCard />
                    </div>

                    {/* Right Column: Mission & Capabilities */}
                    <div className="lg:col-span-7 space-y-6 text-center sm:text-left flex flex-col items-center sm:items-start">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-cyan-500/30">
                                Our Mission
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase leading-snug">
                                Honest Pricing, Verified Quality, And Fast Delivery
                            </h2>
                        </div>

                        <div className="space-y-3 text-slate-300 text-sm leading-relaxed font-medium">
                            <p>
                                At AMC, we believe healthcare providers and patients deserve clear, reliable equipment without hidden surprises. We hope improving the quality of partner care and services. We care for our partners, presenting our experience, knowledge, and relationships to help our customers have high-standard products and services.
                            </p>
                            <p>
                                We provide them with the best services and best after-sale support. To do this, as a medical provider, we get the best medical equipment we can to provide medical solutions for practitioners and patients.
                            </p>
                            <p className="font-bold text-cyan-200/90 italic border-l-2 border-cyan-400 pl-3 py-0.5">
                                "We listen and understand the needs of today to expect the needs of the future — hoping all of you a good, healthy life."
                            </p>
                        </div>

                        {/* Feature Checklist */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 py-2 w-full">
                            {[
                                "Inspected & Cleaned Equipment",
                                "Fast Direct Shipping in Egypt",
                                "Warranty & Ongoing Support",
                                "Clear & Honest Pricing"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-start gap-2.5">
                                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                                    <span className="text-xs sm:text-sm font-extrabold text-slate-200">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2 flex justify-center sm:justify-start w-full sm:w-auto">
                            <Link 
                                to="/products" 
                                className="inline-flex items-center justify-center gap-3 bg-cyan-500 text-slate-950 px-7 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 active:scale-95 transition-all duration-300 group border border-cyan-400/40"
                            >
                                <span>Explore Our Products</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Bottom CTA Card */}
                <div className="bg-slate-950/80 backdrop-blur-xl text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                    <div>
                        <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1">Have Questions or Need Help?</h3>
                        <p className="text-slate-400 text-xs font-medium">Our medical specialists are ready to assist you anytime.</p>
                    </div>
                    <Link 
                        to="/contact"
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-colors duration-200 border border-cyan-400/30 shrink-0"
                    >
                        Contact Us Today
                    </Link>
                </div>

            </div>
        </section>
    );
}

export default About;
