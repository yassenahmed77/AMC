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
                        Have questions about device specifications, pricing, or fast delivery across Egypt? Reach out to us directly via phone, WhatsApp, or email.
                    </p>
                </div>

                {/* 4 Primary Touchpoint Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    
                    {/* 1. Phone Call */}
                    <div className="bg-white border border-maincolor/15 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
                        <div>
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
                    <div className="bg-white border border-emerald-500/20 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
                        <div>
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

                    {/* 3. Showroom & Office Locations */}
                    <div className="bg-white border border-maincolor/15 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-primarycolor/10 text-primarycolor flex items-center justify-center mb-5 border border-primarycolor/20">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Our Branches</h3>
                            
                            {/* Branch 1 */}
                            <div className="mb-4 pb-3 border-b border-slate-100">
                                <span className="text-[11px] font-black uppercase text-maincolor tracking-wider block mb-1">Branch 1 (Mokattam)</span>
                                <p className="text-xs font-bold text-slate-700 leading-snug mb-2">{address1}</p>
                                <a 
                                    href={address1Map}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-[11px] font-black text-slate-800 hover:text-maincolor transition-colors"
                                >
                                    <MapPin size={12} className="text-primarycolor" />
                                    <span>Branch 1 Map →</span>
                                </a>
                            </div>

                            {/* Branch 2 */}
                            <div className="mb-2">
                                <span className="text-[11px] font-black uppercase text-maincolor tracking-wider block mb-1">Branch 2 (Gezira Institute)</span>
                                <p className="text-xs font-bold text-slate-700 leading-snug mb-2">{address2}</p>
                                <a 
                                    href={address2Map}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-[11px] font-black text-slate-800 hover:text-maincolor transition-colors"
                                >
                                    <MapPin size={12} className="text-primarycolor" />
                                    <span>Branch 2 Map →</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* 4. Official Email */}
                    <div className="bg-white border border-maincolor/15 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
                        <div>
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

                </div>

                {/* Additional Trust & Service Details Panel */}
                <ServiceGuaranteePanel />

            </div>
        </section>
    );
}

export default Contact;
