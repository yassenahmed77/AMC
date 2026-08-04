import { Link } from 'react-router';
import { Phone, MessageCircle, MapPin, Mail } from 'lucide-react';

function Footer() {
    const phoneNumber = "011 22199076";
    const whatsappClean = "201005183039";
    const address1 = "Building 1, 41 Street, District 5110, from 9 Street, Deplomasyeen Area, Mokattam - Cairo";
    const address1Map = "https://maps.google.com/?q=Mokattam,+Cairo,+Egypt";
    const address2 = "Building 9019, Street 72, Beside El Gezira High Institute";
    const address2Map = "https://maps.app.goo.gl/HCnjvwGAScNn5NBb9?g_st=iw";
    const email = "medicalsolutionsamc@gmail.com";

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-slate-900 text-white border-t border-maincolor/30 pt-12 sm:pt-16 pb-8 relative overflow-hidden font-sans">
            {/* Subtle background ambient blur */}
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-maincolor/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container relative z-10 space-y-8 sm:space-y-10 px-4 sm:px-6">
                
                {/* Top Section: Brand Story & Navigation Columns (Original 12-Col Desktop, Responsive Mobile/Tablet) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-10 items-start">
                    
                    {/* Brand Column (Col 1-5 on Desktop) */}
                    <div className="sm:col-span-2 lg:col-span-5 space-y-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-3">
                            <Link to="/" onClick={scrollToTop} className="w-10 h-10 block shrink-0">
                                <img src="/logo.png" alt="AMC Logo" className="w-full h-full object-contain" />
                            </Link>
                            <span className="text-2xl font-black uppercase tracking-tight">
                                <span className="text-white">AMC</span>{" "}
                                <span className="text-primarycolor">MEDICAL</span>
                            </span>
                        </div>

                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-bold max-w-md text-center lg:text-left">
                            Providing certified medical equipment, respiratory devices, and patient care solutions across Egypt with full warranty and technical support.
                        </p>
                    </div>

                    {/* Quick Navigation Links (Col 6-8 on Desktop) */}
                    <div className="space-y-3 sm:space-y-4 flex flex-col items-center lg:items-start lg:col-span-3 text-center lg:text-left">
                        <h4 className="text-xs sm:text-sm font-black uppercase tracking-widest text-primarycolor text-center lg:text-left">Quick Links</h4>
                        <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm font-black text-slate-300 flex flex-col items-center lg:items-start text-center lg:text-left">
                            <li className="w-full text-center lg:text-left">
                                <Link to="/" onClick={scrollToTop} className="hover:text-white transition-colors inline-flex items-center justify-center lg:justify-start gap-1">
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li className="w-full text-center lg:text-left">
                                <Link to="/about" onClick={scrollToTop} className="hover:text-white transition-colors inline-flex items-center justify-center lg:justify-start gap-1">
                                    <span>About Us</span>
                                </Link>
                            </li>
                            <li className="w-full text-center lg:text-left">
                                <Link to="/products" onClick={scrollToTop} className="hover:text-white transition-colors inline-flex items-center justify-center lg:justify-start gap-1">
                                    <span>Products</span>
                                </Link>
                            </li>
                            <li className="w-full text-center lg:text-left">
                                <Link to="/contact" onClick={scrollToTop} className="hover:text-white transition-colors inline-flex items-center justify-center lg:justify-start gap-1">
                                    <span>Contact Us</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Medical Categories (Col 9-12 on Desktop) */}
                    <div className="space-y-3 sm:space-y-4 flex flex-col items-center lg:items-start lg:col-span-4 text-center lg:text-left">
                        <h4 className="text-xs sm:text-sm font-black uppercase tracking-widest text-primarycolor text-center lg:text-left">Medical Solutions</h4>
                        <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm font-black text-slate-300 flex flex-col items-start text-left">
                            <li className="flex items-center justify-start gap-2">
                                <span className="w-2 h-2 rounded-full bg-maincolor shrink-0"></span>
                                <span>Respiratory & Oxygen</span>
                            </li>
                            <li className="flex items-center justify-start gap-2">
                                <span className="w-2 h-2 rounded-full bg-maincolor shrink-0"></span>
                                <span>Patient Monitors</span>
                            </li>
                            <li className="flex items-center justify-start gap-2">
                                <span className="w-2 h-2 rounded-full bg-maincolor shrink-0"></span>
                                <span>ICU & Home Recovery</span>
                            </li>
                            <li className="flex items-center justify-start gap-2">
                                <span className="w-2 h-2 rounded-full bg-maincolor shrink-0"></span>
                                <span>Hospital Supplies</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Dedicated Centered Contact Bar - Icons Only */}
                <div className="w-full py-5 border-y border-slate-800/80 flex items-center justify-center flex-wrap gap-3.5 sm:gap-6 mx-auto">
                    {/* Phone Call */}
                    <a 
                        href={`tel:${phoneNumber.replace(/\s+/g, '')}`} 
                        title={`Call ${phoneNumber}`}
                        aria-label="Call Us"
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-slate-800 hover:bg-maincolor text-maincolor hover:text-white flex items-center justify-center border border-slate-700/60 shadow-sm transition-all duration-300 hover:scale-110 group cursor-pointer"
                    >
                        <Phone size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                    </a>

                    {/* WhatsApp */}
                    <a 
                        href={`https://wa.me/${whatsappClean}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title="Chat on WhatsApp"
                        aria-label="WhatsApp Chat"
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-slate-800 hover:bg-emerald-500 text-emerald-400 hover:text-white flex items-center justify-center border border-slate-700/60 shadow-sm transition-all duration-300 hover:scale-110 group cursor-pointer"
                    >
                        <MessageCircle size={18} className="group-hover:scale-110 transition-transform duration-300" />
                    </a>

                    {/* Email */}
                    <a 
                        href={`mailto:${email}`}
                        title={`Email: ${email}`}
                        aria-label="Send Email"
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-slate-800 hover:bg-maincolor text-maincolor hover:text-white flex items-center justify-center border border-slate-700/60 shadow-sm transition-all duration-300 hover:scale-110 group cursor-pointer"
                    >
                        <Mail size={18} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </a>

                    {/* Branch 1 Location (Mokattam - Rose/Red Accent) */}
                    <a 
                        href={address1Map} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title={`Branch 1 (Mokattam): ${address1}`}
                        aria-label="Branch 1 Location"
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-slate-800 hover:bg-rose-500 text-rose-500 hover:text-white flex items-center justify-center border border-slate-700/60 shadow-sm transition-all duration-300 hover:scale-110 group cursor-pointer"
                    >
                        <MapPin size={18} className="group-hover:bounce transition-transform duration-300" />
                    </a>

                    {/* Branch 2 Location (Gezira Institute - Sky/Cyan Accent) */}
                    <a 
                        href={address2Map} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title={`Branch 2 (Gezira Institute): ${address2}`}
                        aria-label="Branch 2 Location"
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-slate-800 hover:bg-sky-500 text-sky-400 hover:text-white flex items-center justify-center border border-slate-700/60 shadow-sm transition-all duration-300 hover:scale-110 group cursor-pointer"
                    >
                        <MapPin size={18} className="group-hover:bounce transition-transform duration-300" />
                    </a>
                </div>

                {/* Bottom Bar: Pure 3-Column Grid */}
                <div className="pt-2 grid grid-cols-1 md:grid-cols-3 items-center text-center gap-4 text-xs font-black text-slate-400">
                    {/* Left Column: Copyright */}
                    <p className="md:text-left text-slate-400 font-bold">© {new Date().getFullYear()} AMC Medical Store. All rights reserved.</p>

                    {/* Middle Column: Pure Grid Centered Signature Pill */}
                    <div className="flex justify-center items-center">
                        <a 
                            href="https://www.facebook.com/yassenazarooo" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-slate-200 transition-colors text-xs font-semibold tracking-wide"
                        >
                            Designed & Developed by <span className="text-slate-200 font-bold hover:text-primarycolor underline underline-offset-4 decoration-primarycolor/40 hover:decoration-primarycolor transition-all">Yassen</span>
                        </a>
                    </div>

                    {/* Right Column: Back to Top */}
                    <div className="flex justify-center md:justify-end">
                        <button 
                            onClick={scrollToTop} 
                            className="hover:text-white transition-colors cursor-pointer font-bold inline-flex items-center gap-1 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/50 hover:bg-slate-800"
                        >
                            <span>Back to Top</span>
                            <span className="text-primarycolor font-black">↑</span>
                        </button>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
