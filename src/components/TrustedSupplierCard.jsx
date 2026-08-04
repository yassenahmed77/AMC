import { Award, Building2 } from 'lucide-react';

function TrustedSupplierCard({
    badgeText = "Trusted Medical Supplier",
    title = "Quality Equipment For Safe Patient Recovery",
    description = "For over 25 years, AMC has focused on delivering reliable medical technology, from respiratory concentrators to patient monitors and ICU setups.",
    years = "25+",
    yearsLabel = "Years Experience",
    devices = "5,000+",
    devicesLabel = "Devices Delivered"
}) {
    return (
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden border border-maincolor/30">
            {/* Decorative background ambient blur */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-maincolor/30 rounded-full blur-3xl pointer-events-none" />

            <span className="text-xs font-black uppercase tracking-widest text-maincolor bg-maincolor/10 px-3.5 py-1.5 rounded-full inline-block mb-6 border border-maincolor/30">
                {badgeText}
            </span>

            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-snug mb-4">
                {title}
            </h3>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-8 font-medium">
                {description}
            </p>

            {/* Key Stats Counter Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-maincolor/20 text-center sm:text-left">
                <div className="space-y-1 flex flex-col items-center sm:items-start">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                        <Award className="w-5 h-5 text-primarycolor" />
                        <span className="text-2xl font-black font-mono text-white">{years}</span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{yearsLabel}</p>
                </div>

                <div className="space-y-1 flex flex-col items-center sm:items-start">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                        <Building2 className="w-5 h-5 text-emerald-400" />
                        <span className="text-2xl font-black font-mono text-white">{devices}</span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{devicesLabel}</p>
                </div>
            </div>
        </div>
    );
}

export default TrustedSupplierCard;
