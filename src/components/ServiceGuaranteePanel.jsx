import { Clock, ShieldCheck, Truck } from 'lucide-react';

function ServiceGuaranteePanel() {
    return (
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-maincolor/30 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-maincolor/20 text-maincolor flex items-center justify-center shrink-0 border border-maincolor/30">
                    <Clock className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-sm font-extrabold uppercase tracking-tight text-white mb-1">Working Hours</h4>
                    <p className="text-slate-400 text-xs leading-relaxed font-medium">
                        Sunday – Thursday: 9:00 AM – 8:00 PM<br />
                        Friday & Saturday: Available for urgent setups
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-sm font-extrabold uppercase tracking-tight text-white mb-1">Tested Equipment</h4>
                    <p className="text-slate-400 text-xs leading-relaxed font-medium">
                        Every medical device is inspected and cleaned before delivery with full operating guarantee.
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primarycolor/20 text-primarycolor flex items-center justify-center shrink-0 border border-primarycolor/30">
                    <Truck className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-sm font-extrabold uppercase tracking-tight text-white mb-1">Nationwide Shipping</h4>
                    <p className="text-slate-400 text-xs leading-relaxed font-medium">
                        Fast direct shipping to your clinic or home address in Cairo, Giza, and all Egyptian governorates.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ServiceGuaranteePanel;
