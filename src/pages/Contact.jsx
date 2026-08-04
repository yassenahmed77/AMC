import { Phone, MessageCircle, MapPin, Mail } from 'lucide-react';
import ServiceGuaranteePanel from '../components/ServiceGuaranteePanel';

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
        <section className="py-12 sm:py-20 min-h-screen bg-slate-50/50">
            <div className="container">
                {/* Header Banner */}
                <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                    <span className="text-xs font-black uppercase tracking-widest text-maincolor bg-maincolor/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-maincolor/20">
                        Contact Us
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight uppercase leading-tight">
                        Get In Touch With AMC Medical
                    </h1>
                    <p className="text-slate-500 text-sm mt-3 font-medium leading-relaxed">
                        Have questions about device specifications, pricing, or fast delivery across Egypt? Reach out to us directly via phone, WhatsApp, email, or social channels.
                    </p>
                </div>

                {/* 7 Primary Touchpoint Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    
                    {/* 1. Phone Call */}
                    <div className="bg-white border border-maincolor/15 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between items-center text-center">
                        <div className="flex flex-col items-center text-center w-full">
                            <div className="w-12 h-12 rounded-2xl bg-maincolor/10 text-maincolor flex items-center justify-center mb-5 border border-maincolor/20">
                                <Phone className="w-6 h-6" />
                            </div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Direct Phone</h3>
                            <p className="text-lg font-black text-slate-800 font-mono mb-2">{phoneNumber}</p>
                            <p className="text-slate-500 text-xs leading-relaxed font-medium mb-6">
                                Speak directly with our medical equipment team.
                            </p>
                        </div>
                        <a 
                            href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
                            className="w-full inline-flex items-center justify-center gap-2 bg-maincolor hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors duration-200"
                        >
                            <Phone size={14} />
                            <span>Call Now</span>
                        </a>
                    </div>

                    {/* 2. WhatsApp Direct Chat */}
                    <div className="bg-white border border-emerald-500/20 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between items-center text-center">
                        <div className="flex flex-col items-center text-center w-full">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-5 border border-emerald-500/20">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">WhatsApp Chat</h3>
                            <p className="text-lg font-black text-slate-800 font-mono mb-2">{whatsappNumber}</p>
                            <p className="text-slate-500 text-xs leading-relaxed font-medium mb-6">
                                Quickest way to ask about device prices & photos.
                            </p>
                        </div>
                        <a 
                            href={`https://wa.me/${whatsappClean}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-emerald-500/10 transition-colors duration-200"
                        >
                            <MessageCircle size={14} />
                            <span>Chat on WhatsApp</span>
                        </a>
                    </div>

                    {/* 3. Official Email */}
                    <div className="bg-white border border-maincolor/15 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between items-center text-center">
                        <div className="flex flex-col items-center text-center w-full">
                            <div className="w-12 h-12 rounded-2xl bg-maincolor/10 text-maincolor flex items-center justify-center mb-5 border border-maincolor/20">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Official Email</h3>
                            <p className="text-xs font-extrabold text-slate-800 break-all mb-2">{email}</p>
                            <p className="text-slate-500 text-xs leading-relaxed font-medium mb-6">
                                Send official inquiries or commercial requests.
                            </p>
                        </div>
                        <a 
                            href={`mailto:${email}`}
                            className="w-full inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors duration-200"
                        >
                            <Mail size={14} />
                            <span>Send Email</span>
                        </a>
                    </div>

                    {/* 4. Instagram Profile */}
                    <div className="bg-white border border-pink-500/20 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between items-center text-center">
                        <div className="flex flex-col items-center text-center w-full">
                            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-600 flex items-center justify-center mb-5 border border-pink-500/20">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                </svg>
                            </div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Instagram</h3>
                            <p className="text-sm font-black text-slate-800 mb-2">@amcmedicalsolutions</p>
                            <p className="text-slate-500 text-xs leading-relaxed font-medium mb-6">
                                Follow us for device updates & store news.
                            </p>
                        </div>
                        <a 
                            href={instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-pink-500/10 transition-opacity duration-200"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                            </svg>
                            <span>Follow on Instagram</span>
                        </a>
                    </div>

                    {/* 5. Facebook Page */}
                    <div className="bg-white border border-blue-500/20 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between items-center text-center">
                        <div className="flex flex-col items-center text-center w-full">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-5 border border-blue-500/20">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Facebook Page</h3>
                            <p className="text-sm font-black text-slate-800 mb-2">AMC Medical Solutions</p>
                            <p className="text-slate-500 text-xs leading-relaxed font-medium mb-6">
                                Connect with our official Facebook community page.
                            </p>
                        </div>
                        <a 
                            href={facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-blue-600/10 transition-colors duration-200"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                            <span>Visit Facebook Page</span>
                        </a>
                    </div>

                    {/* 6. Branch 1 (Mokattam) */}
                    <div className="bg-white border border-rose-500/20 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between items-center text-center">
                        <div className="flex flex-col items-center text-center w-full">
                            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-5 border border-rose-500/20">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Branch 1 (Mokattam)</h3>
                            <p className="text-xs font-bold text-slate-800 leading-snug mb-2">{address1}</p>
                            <p className="text-slate-500 text-xs leading-relaxed font-medium mb-6">
                                Visit our main Mokattam location for device inspection.
                            </p>
                        </div>
                        <a 
                            href={address1Map}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-rose-500/10 transition-colors duration-200"
                        >
                            <MapPin size={14} />
                            <span>Open Mokattam Map</span>
                        </a>
                    </div>

                    {/* 7. Branch 2 (Gezira Institute) */}
                    <div className="bg-white border border-sky-500/20 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between items-center text-center">
                        <div className="flex flex-col items-center text-center w-full">
                            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-5 border border-sky-500/20">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Branch 2 (Gezira Institute)</h3>
                            <p className="text-xs font-bold text-slate-800 leading-snug mb-2">{address2}</p>
                            <p className="text-slate-500 text-xs leading-relaxed font-medium mb-6">
                                Visit our branch beside El Gezira High Institute.
                            </p>
                        </div>
                        <a 
                            href={address2Map}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-sky-500/10 transition-colors duration-200"
                        >
                            <MapPin size={14} />
                            <span>Open Gezira Map</span>
                        </a>
                    </div>

                </div>

                {/* Additional Trust & Service Details Panel */}
                <ServiceGuaranteePanel />

            </div>
        </section>
    );
}

export default Contact;
