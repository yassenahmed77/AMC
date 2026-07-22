import { Link } from 'react-router';
import { Phone, MessageCircle, MapPin, Mail } from 'lucide-react';

function Footer() {
    const phoneNumber = "011 22199076";
    const whatsappClean = "201005183039";
    const address = "Building 1, 41 Street, District 5110, from 9 Street, Deplomasyeen Area, Mokattam - Cairo";
    const email = "medicalsolutionsamc@gmail.com";

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-slate-900 text-white border-t border-maincolor/30 pt-16 pb-8 relative overflow-hidden font-sans">
            {/* Subtle background ambient blur */}
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-maincolor/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container relative z-10 space-y-10">
                
                {/* Top Section: Brand Story & Navigation Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
                    
                    {/* Brand Column (Col 1-5) */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="flex items-center gap-3">
                            <Link to="/" onClick={scrollToTop} className="w-10 h-10 block shrink-0">
                                <img src="/logo.png" alt="AMC Logo" className="w-full h-full object-contain" />
                            </Link>
                            <span className="text-2xl font-black uppercase tracking-tight">
                                <span className="text-white">AMC</span>{" "}
                                <span className="text-primarycolor">MEDICAL</span>
                            </span>
                        </div>

                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-bold max-w-md">
                            Providing certified medical equipment, respiratory devices, and patient care solutions across Egypt with full warranty and technical support.
                        </p>
                    </div>

                    {/* Quick Navigation Links (Col 6-8) */}
                    <div className="lg:col-span-3 space-y-4">
                        <h4 className="text-sm font-black uppercase tracking-widest text-primarycolor">Quick Links</h4>
                        <ul className="space-y-3 text-xs sm:text-sm font-black text-slate-300">
                            <li>
                                <Link to="/" onClick={scrollToTop} className="hover:text-white transition-colors inline-flex items-center gap-1">
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" onClick={scrollToTop} className="hover:text-white transition-colors inline-flex items-center gap-1">
                                    <span>About Us</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" onClick={scrollToTop} className="hover:text-white transition-colors inline-flex items-center gap-1">
                                    <span>Products</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" onClick={scrollToTop} className="hover:text-white transition-colors inline-flex items-center gap-1">
                                    <span>Contact Us</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Medical Categories (Col 9-12) */}
                    <div className="lg:col-span-4 space-y-4">
                        <h4 className="text-sm font-black uppercase tracking-widest text-primarycolor">Medical Solutions</h4>
                        <ul className="space-y-3 text-xs sm:text-sm font-black text-slate-300">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-maincolor shrink-0"></span>
                                <span>Respiratory & Oxygen Concentrators</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-maincolor shrink-0"></span>
                                <span>Patient Monitors & Diagnostic Units</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-maincolor shrink-0"></span>
                                <span>ICU & Home Recovery Equipment</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-maincolor shrink-0"></span>
                                <span>Hospital & B2B Procurement Supplies</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Dedicated Centered Contact Bar */}
                <div className="w-full py-5 border-y border-slate-800 flex flex-wrap items-center justify-center text-center gap-x-8 gap-y-3 text-xs sm:text-sm font-black text-slate-300 mx-auto">
                    <div className="flex items-center gap-2">
                        <Phone size={16} className="text-maincolor shrink-0" />
                        <a href={`tel:${phoneNumber.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">{phoneNumber}</a>
                    </div>

                    <div className="flex items-center gap-2">
                        <MessageCircle size={16} className="text-emerald-400 shrink-0" />
                        <a href={`https://wa.me/${whatsappClean}`} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">WhatsApp: +20 10 05183039</a>
                    </div>

                    <div className="flex items-center gap-2">
                        <Mail size={16} className="text-maincolor shrink-0" />
                        <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
                    </div>

                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-primarycolor shrink-0" />
                        <a href="https://maps.google.com/?q=Mokattam,+Cairo,+Egypt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{address}</a>
                    </div>
                </div>

                {/* Bottom Bar: Pure 3-Column Grid */}
                <div className="pt-2 grid grid-cols-1 md:grid-cols-3 items-center text-center gap-4 text-xs font-black text-slate-400">
                    {/* Left Column: Copyright */}
                    <p className="md:text-left">© {new Date().getFullYear()} AMC Medical Store. All rights reserved.</p>

                    {/* Middle Column: Pure Grid Centered Signature Pill */}
                    <div className="flex justify-center items-center">
                        <a 
                            href="https://www.facebook.com/yassenazarooo" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-800 border border-maincolor/40 hover:border-maincolor text-slate-200 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 text-xs font-black tracking-wide group shadow-md shadow-maincolor/10"
                        >
                            <span>Azaroo Was Here!</span>
                            <span className="text-xs group-hover:scale-125 transition-transform duration-300">😉</span>
                        </a>
                    </div>

                    {/* Right Column: Back to Top */}
                    <div className="flex justify-center md:justify-end">
                        <button 
                            onClick={scrollToTop} 
                            className="hover:text-white transition-colors cursor-pointer"
                        >
                            Back to Top ↑
                        </button>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
