import { Phone, MessageCircle, MapPin, Mail, ExternalLink } from 'lucide-react';
import ServiceGuaranteePanel from '../components/ServiceGuaranteePanel';

function InstagramIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
}

function FacebookIcon({ size = 20, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    );
}

function Contact() {
    const phoneNumber = "011 22199076";
    const whatsappNumber = "+20 10 05183039";
    const whatsappClean = "201005183039";
    const address1 = "Building 1, 41 Street, District 5110, from 9 Street, Deplomasyeen Area, Mokattam - Cairo";
    const address1Map = "https://maps.google.com/?q=Mokattam,+Cairo,+Egypt";

    const address2 = "Building 9019, Street 72, Beside El Gezira High Institute";
    const address2Map = "https://maps.app.goo.gl/HCnjvwGAScNn5NBb9?g_st=iw";

    const email = "medicalsolutionsamc@gmail.com";
    const instagramUrl = "https://www.instagram.com/amcmedicalsolutions?igsh=MmxodjF0bWZ6b3Yw";
    const facebookUrl = "https://www.facebook.com/share/1BxikcFQFo/?mibextid=wwXIfr";

    return (
        <section className="py-12 sm:py-20 min-h-screen bg-transparent">
            <div className="container">
                {/* Header Banner */}
                <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                    <span className="text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-4 py-1.5 rounded-full inline-block mb-3 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-950/40">
                        Contact Us
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                        Get In Touch With AMC Medical
                    </h1>
                    <p className="text-slate-400 text-sm mt-3 font-medium leading-relaxed">
                        Have questions about device specifications, pricing, or fast delivery across Egypt? Reach out to us directly via phone, WhatsApp, email, or visit our clinics and warehouses.
                    </p>
                </div>

                {/* 7 Primary Touchpoint Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    
                    {/* 1. Phone Call */}
                    <div className="bg-slate-900/75 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 rounded-3xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between items-center text-center group">
                        <div className="flex flex-col items-center text-center w-full">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <Phone className="w-6 h-6" />
                            </div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Direct Phone</h3>
                            <p className="text-lg font-black text-white font-mono mb-2">{phoneNumber}</p>
                            <p className="text-slate-300 text-xs leading-relaxed font-normal mb-6">
                                Speak directly with our biomedical engineering specialists.
                            </p>
                        </div>
                        <a 
                            href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
                            className="w-full inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all duration-200 cursor-pointer"
                        >
                            <Phone size={14} />
                            <span>Call Now</span>
                        </a>
                    </div>

                    {/* 2. WhatsApp Direct Chat */}
                    <div className="bg-slate-900/75 backdrop-blur-xl border border-white/10 hover:border-emerald-400/40 rounded-3xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between items-center text-center group">
                        <div className="flex flex-col items-center text-center w-full">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">WhatsApp Chat</h3>
                            <p className="text-lg font-black text-white font-mono mb-2">{whatsappNumber}</p>
                            <p className="text-slate-300 text-xs leading-relaxed font-normal mb-6">
                                Quickest way to ask about device specs, real photos & fast quotes.
                            </p>
                        </div>
                        <a 
                            href={`https://wa.me/${whatsappClean}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/25 transition-all duration-200 cursor-pointer"
                        >
                            <MessageCircle size={14} />
                            <span>Chat on WhatsApp</span>
                        </a>
                    </div>

                    {/* 3. Official Email */}
                    <div className="bg-slate-900/75 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 rounded-3xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between items-center text-center group">
                        <div className="flex flex-col items-center text-center w-full">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Official Email</h3>
                            <p className="text-xs font-extrabold text-white break-all mb-2">{email}</p>
                            <p className="text-slate-300 text-xs leading-relaxed font-normal mb-6">
                                Send official hospital tenders, inquiries, or B2B requests.
                            </p>
                        </div>
                        <a 
                            href={`mailto:${email}`}
                            className="w-full inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider border border-white/10 transition-all duration-200 cursor-pointer"
                        >
                            <Mail size={14} />
                            <span>Send Email</span>
                        </a>
                    </div>

                    {/* 4. Location: Mokattam */}
                    <div className="bg-slate-900/75 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 rounded-3xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between items-center text-center group">
                        <div className="flex flex-col items-center text-center w-full">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Mokattam Headquarters</h3>
                            <p className="text-sm font-bold text-white mb-2">Cairo, Egypt</p>
                            <p className="text-slate-300 text-xs leading-relaxed font-normal mb-6">
                                {address1}
                            </p>
                        </div>
                        <a 
                            href={address1Map}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider border border-white/10 transition-all duration-200 cursor-pointer"
                        >
                            <MapPin size={14} />
                            <span>View on Google Maps</span>
                        </a>
                    </div>

                    {/* 5. Location: Branch 2 */}
                    <div className="bg-slate-900/75 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 rounded-3xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between items-center text-center group">
                        <div className="flex flex-col items-center text-center w-full">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Secondary Hub</h3>
                            <p className="text-sm font-bold text-white mb-2">Beside El Gezira Institute</p>
                            <p className="text-slate-300 text-xs leading-relaxed font-normal mb-6">
                                {address2}
                            </p>
                        </div>
                        <a 
                            href={address2Map}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider border border-white/10 transition-all duration-200 cursor-pointer"
                        >
                            <MapPin size={14} />
                            <span>Open in Maps</span>
                        </a>
                    </div>

                    {/* 6. Social Media */}
                    <div className="bg-slate-900/75 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 rounded-3xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between items-center text-center group">
                        <div className="flex flex-col items-center text-center w-full">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <InstagramIcon size={24} />
                            </div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Social Channels</h3>
                            <p className="text-sm font-bold text-white mb-2">Instagram & Facebook</p>
                            <p className="text-slate-300 text-xs leading-relaxed font-normal mb-6">
                                Follow our daily delivery stories, device maintenance tips, and clinical updates.
                            </p>
                        </div>
                        <div className="w-full flex items-center gap-2">
                            <a 
                                href={instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all duration-200"
                            >
                                <InstagramIcon size={14} />
                                <span>Instagram</span>
                            </a>
                            <a 
                                href={facebookUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all duration-200"
                            >
                                <FacebookIcon size={14} />
                                <span>Facebook</span>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Service Guarantee */}
                <ServiceGuaranteePanel />
            </div>
        </section>
    );
}

export default Contact;
