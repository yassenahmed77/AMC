import { Link } from 'react-router';
import { Award, Building2, ShieldCheck, Truck, Wrench, HeartHandshake, ArrowRight, CheckCircle2 } from 'lucide-react';

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
                        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden border border-maincolor/30">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-maincolor/30 rounded-full blur-3xl pointer-events-none" />

                            <span className="text-xs font-black uppercase tracking-widest text-maincolor bg-maincolor/10 px-3.5 py-1.5 rounded-full inline-block mb-6 border border-maincolor/30">
                                Trusted Medical Supplier
                            </span>

                            <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-snug mb-4">
                                Quality Equipment For Safe Patient Recovery
                            </h3>

                            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-8 font-medium">
                                For over 10 years, AMC has focused on delivering reliable medical technology, from respiratory concentrators to patient monitors and ICU setups.
                            </p>

                            {/* Key Stats */}
                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-maincolor/20 text-center sm:text-left">
                                <div className="space-y-1 flex flex-col items-center sm:items-start">
                                    <div className="flex items-center justify-center sm:justify-start gap-2">
                                        <Award className="w-5 h-5 text-primarycolor" />
                                        <span className="text-2xl font-black font-mono text-white">10+</span>
                                    </div>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Years Experience</p>
                                </div>

                                <div className="space-y-1 flex flex-col items-center sm:items-start">
                                    <div className="flex items-center justify-center sm:justify-start gap-2">
                                        <Building2 className="w-5 h-5 text-emerald-400" />
                                        <span className="text-2xl font-black font-mono text-white">5,000+</span>
                                    </div>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Devices Delivered</p>
                                </div>
                            </div>
                        </div>
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

                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                            At AMC, we believe healthcare providers and patients deserve clear, reliable equipment without hidden surprises. Every device we offer is thoroughly tested by our technical team to guarantee proper operating condition before it reaches your door.
                        </p>

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
