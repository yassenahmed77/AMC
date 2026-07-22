import { ShieldCheck, Truck, Wrench, Headphones } from 'lucide-react';

const features = [
    {
        icon: ShieldCheck,
        title: "Medical Grade Certified",
        description: "All medical equipment is certified and meets top health and safety standards.",
        tag: "100% Guaranteed"
    },
    {
        icon: Truck,
        title: "Express Nationwide Delivery",
        description: "Fast and safe delivery to hospitals, clinics, and homecare patients across Egypt.",
        tag: "Fast Shipping"
    },
    {
        icon: Wrench,
        title: "Warranty & Maintenance",
        description: "Full warranty coverage, routine maintenance, and genuine spare parts.",
        tag: "Full Support"
    },
    {
        icon: Headphones,
        title: "24/7 Expert Consultation",
        description: "Our team is available round the clock to help you choose the right medical device.",
        tag: "Always On"
    }
];

function TrustFeatures() {
    return (
        <section className="py-16 bg-slate-50/50 border-y border-maincolor/10">
            <div className="container">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-xs font-black uppercase tracking-widest text-maincolor bg-maincolor/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-maincolor/20">
                        Why Choose AMC
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight uppercase">
                        Uncompromising Quality & Service
                    </h2>
                    <p className="text-slate-500 text-sm mt-2 font-medium">
                        We provide clinics, hospitals, and homecare patients with trusted medical equipment.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div 
                                key={idx}
                                className="bg-white border border-maincolor/15 hover:border-maincolor/30 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-center mb-5">
                                        <div className="w-12 h-12 bg-maincolor/5 text-maincolor rounded-2xl flex items-center justify-center border border-maincolor/15">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-[10px] font-black text-maincolor/80 uppercase tracking-wider bg-maincolor/5 border border-maincolor/15 px-2.5 py-1 rounded-full">
                                            {item.tag}
                                        </span>
                                    </div>

                                    <h3 className="text-base font-extrabold text-slate-800 uppercase tracking-tight mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-500 text-xs leading-relaxed font-medium">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default TrustFeatures;
