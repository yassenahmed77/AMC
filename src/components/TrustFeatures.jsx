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
        <section className="py-16 bg-slate-50 border-y border-slate-200/80">
            <div className="container">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                        Uncompromising Quality & Service
                    </h2>
                    <p className="text-slate-600 text-sm mt-2.5 font-medium">
                        We provide clinics, hospitals, and homecare patients with trusted medical equipment across Egypt.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div 
                                key={idx}
                                className="bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-12 h-12 bg-maincolor/10 text-maincolor rounded-xl flex items-center justify-center mb-5 border border-maincolor/15">
                                        <Icon className="w-6 h-6" />
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
