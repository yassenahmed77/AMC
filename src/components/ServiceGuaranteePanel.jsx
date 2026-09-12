function ServiceGuaranteePanel() {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-slate-950/75 backdrop-blur-2xl border border-cyan-500/25 shadow-2xl p-6 sm:p-10 transition-all duration-300">
            {/* Luminous Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />
            
            {/* Ambient Background Radial Glow */}
            <div className="absolute -top-20 left-1/3 w-80 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 relative z-10">
                {/* 1. Working Hours */}
                <div className="flex flex-col items-center text-center justify-between space-y-3 md:pr-4">
                    <span className="text-[11px] font-black uppercase tracking-widest text-cyan-300">
                        Operational Hours
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                        Working Hours
                    </h3>
                    <div className="inline-flex items-center justify-center self-center bg-cyan-950/60 border border-cyan-500/30 px-3.5 py-1.5 rounded-xl text-xs font-mono font-black text-cyan-200 shadow-inner">
                        Sat – Thu &bull; 9:00 AM – 5:00 PM
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed font-medium max-w-xs">
                        Biomedical engineering staff available for clinic inquiries, technical guidance, and urgent supplies.
                    </p>
                </div>

                {/* 2. Tested Equipment */}
                <div className="flex flex-col items-center text-center justify-between space-y-3 md:border-x md:border-white/10 md:px-8">
                    <span className="text-[11px] font-black uppercase tracking-widest text-emerald-300">
                        Quality Assurance
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                        Tested Equipment
                    </h3>
                    <div className="inline-flex items-center justify-center self-center bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl text-xs font-bold text-emerald-200 shadow-inner">
                        100% Calibrated & Certified
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed font-medium max-w-xs">
                        Every medical device is inspected and sanitized before delivery with full operating guarantee.
                    </p>
                </div>

                {/* 3. Nationwide Shipping */}
                <div className="flex flex-col items-center text-center justify-between space-y-3 md:pl-4">
                    <span className="text-[11px] font-black uppercase tracking-widest text-sky-300">
                        Logistics Network
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                        Nationwide Shipping
                    </h3>
                    <div className="inline-flex items-center justify-center self-center bg-sky-950/60 border border-sky-500/30 px-3.5 py-1.5 rounded-xl text-xs font-bold text-sky-200 shadow-inner">
                        Cairo, Giza & All Governorates
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed font-medium max-w-xs">
                        Fast direct delivery to clinics, medical centers, and residential addresses with on-site setup support.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ServiceGuaranteePanel;
