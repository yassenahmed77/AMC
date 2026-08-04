import { Link } from 'react-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import TrustedSupplierCard from './TrustedSupplierCard';

function AboutPreview() {
    return (
        <section className="py-20 bg-white border-b border-maincolor/10 overflow-hidden">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column: Visual Stats Card */}
                    <div className="lg:col-span-5">
                        <TrustedSupplierCard 
                            badgeText="Trusted Supplier"
                            title="Healthcare Equipment You Can Depend On"
                            description="For over 25 years, AMC has supplied top quality respiratory, ICU, surgical, and homecare medical devices across Egypt."
                        />
                    </div>

                    {/* Right Column: Story & Bullet Highlights */}
                    <div className="lg:col-span-7 space-y-6 flex flex-col items-center sm:items-start text-center sm:text-left">
                        <div className="flex flex-col items-center sm:items-start">
                            <span className="text-xs font-black uppercase tracking-widest text-maincolor bg-maincolor/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-maincolor/20">
                                About AMC Store
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight uppercase leading-tight">
                                Advancing Patient Care With World-Class Technology
                            </h2>
                        </div>

                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                            At AMC, we deliver certified, high-performance medical devices for intensive care units, clinics, emergency rooms, and home recovery. We combine quality equipment with reliable technical support.
                        </p>

                        {/* Bullet Highlights */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 py-2 w-full">
                            {[
                                "Certified ICU & Respiratory Devices",
                                "On-site Delivery & Device Training",
                                "Comprehensive Spare Parts Stock",
                                "Rapid Emergency Maintenance"
                            ].map((text, idx) => (
                                <div key={idx} className="flex items-center justify-start gap-2.5">
                                    <CheckCircle2 className="w-5 h-5 text-maincolor shrink-0" />
                                    <span className="text-xs sm:text-sm font-extrabold text-slate-700">{text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Call to Action Link */}
                        <div className="pt-4 flex justify-center sm:justify-start w-full sm:w-auto">
                            <Link 
                                to="/about" 
                                className="inline-flex items-center justify-center gap-3 bg-maincolor text-white px-7 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-maincolor/15 hover:bg-blue-700 active:scale-95 transition-all duration-300 group border border-maincolor/30"
                            >
                                <span>Discover Our Story</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default AboutPreview;
