import { Link } from 'react-router';
import { HeartPulse, ArrowLeft } from 'lucide-react';

function NotFound() {
    return (
        <section className="min-h-[80vh] flex items-center justify-center py-20 bg-slate-50/30">
            <div className="container px-4 flex justify-center">
                <div className="flex flex-col items-center justify-center py-16 px-6 sm:px-12 bg-white rounded-3xl border border-slate-100 shadow-xl text-center max-w-lg w-full relative overflow-hidden">
                    {/* Icon */}
                    <div className="w-24 h-24 bg-slate-50 rounded-2xl flex items-center justify-center text-maincolor mb-8 border border-slate-100 shadow-sm relative z-10 animate-bounce">
                        <HeartPulse size={48} className="animate-pulse" />
                    </div>
                    {/* 404 Text */}
                    <h1 className="text-8xl font-black text-slate-800 tracking-tight relative z-10 leading-none">
                        4<span className="text-maincolor">0</span>4
                    </h1>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 uppercase mt-6 relative z-10">
                        Page Not Found
                    </h2>
                    <p className="text-slate-500 text-sm mt-3 max-w-sm leading-relaxed relative z-10">
                        The medical page or device information you are looking for doesn't exist or has been moved.
                    </p>
                    {/* Return Link */}
                    <Link to="/" className="inline-flex items-center gap-2 bg-maincolor text-white px-8 py-3.5 rounded-xl font-bold mt-8 shadow-lg shadow-maincolor/30 hover:bg-maincolor/90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer relative z-10">
                        <ArrowLeft size={16} />
                        <span>Return to Home</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default NotFound;
