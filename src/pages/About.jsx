import { Link } from 'react-router';
import { ShieldCheck, Truck, Wrench, HeartHandshake, ArrowRight, CheckCircle2 } from 'lucide-react';
import TrustedSupplierCard from '../components/TrustedSupplierCard';

function About() {
    return (
        <section className="py-12 sm:py-20 min-h-screen bg-slate-50/50">
            <div className="container">
                
                {/* Header Banner */}
                <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                    <span className="text-xs font-black uppercase tracking-widest text-maincolor bg-maincolor/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-maincolor/20">
                        About Us
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight uppercase leading-tight">
                        About AMC Medical Equipment
                    </h1>
                    <p className="text-slate-500 text-sm mt-3 font-medium leading-relaxed">
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
                            <span className="text-xs font-black uppercase tracking-widest text-maincolor bg-maincolor/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-maincolor/20">
                                Our Mission
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight uppercase leading-snug">
                                Honest Pricing, Verified Quality, And Fast Delivery
                            </h2>
                        </div>

                        <div className="space-y-3 text-slate-600 text-sm leading-relaxed font-medium">
                            <p>
                                At AMC, we believe healthcare providers and patients deserve clear, reliable equipment without hidden surprises. We hope improving the quality of partner care and services. We care for our partners, presenting our experience, knowledge, and relationships to help our customers have high-standard products and services.
                            </p>
                            <p>
                                We provide them with the best services and best after-sale support. To do this, as a medical provider, we get the best medical equipment we can to provide medical solutions for practitioners and patients.
                            </p>
                            <p className="font-bold text-slate-700 italic border-l-2 border-maincolor pl-3 py-0.5">
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
                                    <CheckCircle2 className="w-5 h-5 text-maincolor shrink-0" />
                                    <span className="text-xs sm:text-sm font-extrabold text-slate-700">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2 flex justify-center sm:justify-start w-full sm:w-auto">
                            <Link 
                                to="/products" 
                                className="inline-flex items-center justify-center gap-3 bg-maincolor text-white px-7 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-maincolor/15 hover:bg-blue-700 active:scale-95 transition-all duration-300 group border border-maincolor/30"
                            >
                                <span>Explore Our Products</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                </div>

                {/* 4 Core Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <div className="bg-white border border-maincolor/15 rounded-3xl p-6 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-maincolor/10 text-maincolor flex items-center justify-center mb-5 border border-maincolor/20">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-tight mb-2">Thorough Testing</h3>
                        <p className="text-slate-500 text-xs leading-relaxed font-medium">
                            Every device undergoes multi-step testing to verify electrical and mechanical safety.
                        </p>
                    </div>

                    <div className="bg-white border border-maincolor/15 rounded-3xl p-6 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-5 border border-emerald-500/20">
                            <Truck className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-tight mb-2">Direct Shipping</h3>
                        <p className="text-slate-500 text-xs leading-relaxed font-medium">
                            Fast delivery to Cairo, Giza, and governorates with direct door-to-door handoff.
                        </p>
                    </div>

                    <div className="bg-white border border-maincolor/15 rounded-3xl p-6 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-primarycolor/10 text-primarycolor flex items-center justify-center mb-5 border border-primarycolor/20">
                            <Wrench className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-tight mb-2">Technical Support</h3>
                        <p className="text-slate-500 text-xs leading-relaxed font-medium">
                            Our team provides setup advice, operation instructions, and routine maintenance help.
                        </p>
                    </div>

                    <div className="bg-white border border-maincolor/15 rounded-3xl p-6 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-maincolor/10 text-maincolor flex items-center justify-center mb-5 border border-maincolor/20">
                            <HeartHandshake className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-tight mb-2">Customer Care</h3>
                        <p className="text-slate-500 text-xs leading-relaxed font-medium">
                            Transparent communication and clear advice to ensure you get the exact equipment you need.
                        </p>
                    </div>
                </div>

                {/* Bottom CTA Card */}
                <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-maincolor/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                    <div>
                        <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1">Have Questions or Need Help?</h3>
                        <p className="text-slate-400 text-xs font-medium">Our medical specialists are ready to assist you anytime.</p>
                    </div>
                    <Link 
                        to="/contact"
                        className="bg-maincolor hover:bg-blue-700 text-white font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-colors duration-200 border border-maincolor/30 shrink-0"
                    >
                        Contact Us Today
                    </Link>
                </div>

            </div>
        </section>
    );
}

export default About;
