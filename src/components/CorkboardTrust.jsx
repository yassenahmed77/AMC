import { useState } from 'react';
import { CheckCheck, Star, MessageSquare, ShieldCheck, Truck, Headphones, ZoomIn, X } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

// 3D Push Pin Component with Glossy Highlight & Drop Shadow
function PushPin({ color = 'red', className = '' }) {
    const colors = {
        red: { fill: '#ef4444', border: '#b91c1c', top: '#fca5a5' },
        blue: { fill: '#3b82f6', border: '#1d4ed8', top: '#93c5fd' },
        yellow: { fill: '#eab308', border: '#a16207', top: '#fef08a' },
        green: { fill: '#10b981', border: '#047857', top: '#6ee7b7' },
        gold: { fill: '#d97706', border: '#78350f', top: '#fde68a' }
    };

    const c = colors[color] || colors.red;

    return (
        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none pin-shadow ${className}`}>
            <svg width="32" height="38" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Needle */}
                <path d="M16 26L16 37" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
                
                {/* Main Pin Head Shadow */}
                <circle cx="16" cy="16" r="12" fill={c.border} />
                
                {/* Pin Head Body */}
                <circle cx="16" cy="15" r="11" fill={c.fill} />
                
                {/* Glossy Top Highlight */}
                <circle cx="13" cy="12" r="4.5" fill={c.top} opacity="0.7" />
                <circle cx="12" cy="11" r="2" fill="#ffffff" opacity="0.9" />
                
                {/* Center Rim */}
                <circle cx="16" cy="15" r="7" stroke={c.border} strokeWidth="1" fill="none" opacity="0.4" />
            </svg>
        </div>
    );
}

// Scotch Tape Accent for Photos/Sticky Notes
function ScotchTape({ className = '' }) {
    return (
        <div className={`absolute h-7 w-20 tape-overlay rotate-[-5deg] z-20 opacity-85 pointer-events-none ${className}`} />
    );
}

// Dynamic Star Rating Component (Supports Full, Half, and Empty Stars)
function StarRating({ rating = 5 }) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
        <div className="flex items-center gap-1 mb-3">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            {hasHalf && (
                <div className="relative w-4 h-4">
                    <Star className="w-4 h-4 text-slate-700 fill-slate-800" />
                    <div className="absolute inset-0 overflow-hidden w-[50%]">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    </div>
                </div>
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} className="w-4 h-4 text-slate-700 fill-slate-800" />
            ))}
            <span className="text-xs font-bold text-amber-400 mr-1.5">{rating.toFixed(1)} / 5.0</span>
        </div>
    );
}

const reviewsData = [
    {
        id: 1,
        author: "د. محمود السيد",
        role: "عيادة أنف وأذن وحنجرة - القاهرة",
        time: "11:42 AM",
        message: "ما شاء الله مولد الأكسجين يوفيل 10 لتر وصل في نفس اليوم، الجهاز صوت هادئ وأداء ممتاز والضمان معتمد مع الفاتورة. شكراً جداً يا AMC على السرعة 👍🏥",
        rating: 5,
        attachedPhoto: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
        photoCaption: "صورة الاستلام والتجربة للمولد 10L 🟢",
        pinColor: "red",
        rotation: "hover:rotate-0 -rotate-2 md:-rotate-3",
        badge: "طلب مؤكد ✔️"
    },
    {
        id: 2,
        author: "م. طارق حسن",
        role: "المقطم - القاهرة",
        time: "02:15 PM",
        message: "جهاز البيباب والسباب CPAP فتح الرئة والتنفس بقى مريح جداً للوالد. ومتابعة المهندس الفني من الشحنة للتركيب كانت قمة في الاحترافية والذوق 💯✨",
        rating: 4.5,
        attachedPhoto: null,
        pinColor: "gold",
        rotation: "hover:rotate-0 rotate-2 md:rotate-4",
        badge: "عميل VIP ⭐️"
    },
    {
        id: 3,
        author: "الحاجة فاطمة وعائلتها",
        role: "سموحة - الإسكندرية",
        time: "06:08 PM",
        message: "السرير الطبي الكهربائي 3 حركة ممتاز وسهل الاستخدام جداً.. والضمان والتركيب تم في البيت ببراعة. ربنا يبارك فيكم وفي أمانتكم 💙",
        rating: 5,
        attachedPhoto: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
        photoCaption: "تركيب السرير الطبي بالمستلزمات 🛏️",
        pinColor: "blue",
        rotation: "hover:rotate-0 -rotate-1 md:-rotate-2",
        badge: "شحن سريع 🚚"
    },
    {
        id: 4,
        author: "د. سارة رشدي",
        role: "استشاري رعاية مركزة - الجيزة",
        time: "08:30 PM",
        message: "تعاملت مع شركات كتير لكن AMC بيتميزوا بالأمانة، أجهزة جديدة زيرو وبضمان حقيقي والدعم الفني معاك 24 ساعة. بنرشحكم دائماً لكل المرضى والعيادات 🌿",
        rating: 4,
        attachedPhoto: null,
        pinColor: "green",
        rotation: "hover:rotate-0 rotate-3 md:rotate-2",
        badge: "استشاري طب 🩺"
    }
];

const stickyNotesData = [
    {
        id: 's1',
        title: "ضمان حقيقي 100%",
        desc: "جميع الأجهزة أصلية معتمدة من وزارة الصحة ومرفق معها شهادة الضمان والفاتورة.",
        icon: null,
        color: "bg-amber-100 border-amber-300 text-amber-900",
        pinColor: "red",
        rotation: "-rotate-6 sm:-rotate-12",
        tape: "left-2 -top-3"
    },
    {
        id: 's2',
        title: "توصيل واستلام سريع",
        desc: "شحن مباشر وتوصيل آمن للمستشفيات والعيادات والمنازل في كافة المحافظات.",
        icon: null,
        color: "bg-emerald-100 border-emerald-300 text-emerald-950",
        pinColor: "gold",
        rotation: "rotate-6 sm:rotate-12",
        tape: "right-2 -top-3"
    }
];

function CorkboardTrust() {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    return (
        <section className="py-16 sm:py-24 light-wall-bg border-y border-slate-200/80 overflow-hidden relative font-sans">
            {/* Animated Wall Cracks (Glowing Orange #ff9d19) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-85">
                <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Main Branching Crack Top Left */}
                    <path 
                        d="M-50 100 L180 140 L240 220 L380 200 L450 310 L520 280 M240 220 L290 320 L270 410 M450 310 L560 380" 
                        stroke="#ff9d19" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="crack-glow-path"
                    />

                    {/* Secondary Branching Crack Bottom Right */}
                    <path 
                        d="M1250 650 L1020 600 L950 510 L810 560 L720 440 L610 480 M950 510 L910 400 M720 440 L650 360" 
                        stroke="#ff9d19" 
                        strokeWidth="4" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="crack-glow-path-reverse"
                    />

                    {/* Diagonal Subtle Crack Middle Top */}
                    <path 
                        d="M550 -20 L620 90 L710 130 L680 220" 
                        stroke="#ff9d19" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="crack-glow-path"
                    />

                    {/* Center Micro Crack behind board */}
                    <path 
                        d="M300 700 L380 640 L430 680 L520 610" 
                        stroke="#ff9d19" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="crack-glow-path-reverse"
                    />
                </svg>
            </div>

            {/* Ambient Orange Background Glows */}
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-primarycolor/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-maincolor/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container relative z-10 px-4 sm:px-6">
                
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    {/* <div className="inline-flex items-center gap-2 bg-maincolor/10 border border-maincolor/20 px-4 py-1.5 rounded-full mb-4 shadow-sm">
                        <MessageSquare className="w-4 h-4 text-maincolor" />
                        <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-maincolor">
                            Wall of Trust & Reviews | لوحة آراء العملاء
                        </span>
                    </div> */}

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                        آراء عملائنا مثبتة على <span className="text-primarycolor underline decoration-primarycolor/50 decoration-wavy decoration-2">لوحة الثقة</span> 📌
                    </h2>
                    
                    <p className="text-slate-600 text-sm sm:text-base mt-3 font-semibold max-w-2xl mx-auto leading-relaxed">
                        تجارب حقيقية ورسائل واتساب من الأطباء والمرضى في مصر حول جودة الأجهزة والسرعة والضمان.
                    </p>
                </div>

                {/* Main Corkboard Wall Container */}
                <div className="relative max-w-6xl mx-auto rounded-3xl wood-frame corkboard-bg p-6 sm:p-10 md:p-14">
                    
                    {/* Hanging Metal Rings Decor (Top Corners) */}
                    <div className="absolute -top-6 left-12 w-6 h-10 border-4 border-slate-700 bg-slate-800 rounded-t-full shadow-inner hidden sm:block" />
                    <div className="absolute -top-6 right-12 w-6 h-10 border-4 border-slate-700 bg-slate-800 rounded-t-full shadow-inner hidden sm:block" />

                    {/* Header Banner Pinned to Board */}
                    <ScrollReveal variant="fade-down" delay="delay-100">
                        <div className="relative mx-auto max-w-md bg-amber-50/95 border-2 border-amber-800/30 rounded-xl p-3 sm:p-4 text-center shadow-lg mb-10 -rotate-1 polaroid-card">
                            <PushPin color="red" />
                            <ScotchTape className="-top-3 left-6" />
                            <h3 className="text-slate-900 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2">
                                <span>💬</span>
                                <span>رسائل واتساب المباشرة - AMC Medical Solutions</span>
                            </h3>
                            <p className="text-slate-600 text-xs font-bold mt-0.5">
                                Real Customer WhatsApp Feedback & Live Deliveries
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Zigzag Layout Grid for WhatsApp Cards & Notes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start relative z-10">

                        {/* Left Column Cards (Staggered) */}
                        <div className="space-y-10 md:space-y-14">

                            {/* Sticky Note 1 */}
                            <ScrollReveal variant="zoom-in" delay="delay-100">
                                <div className={`relative ${stickyNotesData[0].rotation} ${stickyNotesData[0].color} p-5 rounded-sm border-2 shadow-xl polaroid-card transition-all duration-300 hover:scale-105`}>
                                    <PushPin color={stickyNotesData[0].pinColor} />
                                    <ScotchTape className={stickyNotesData[0].tape} />
                                    <div className="flex items-center gap-2.5 mb-2">
                                        {stickyNotesData[0]?.icon && (() => {
                                            const Note1Icon = stickyNotesData[0].icon;
                                            return <Note1Icon className="w-6 h-6 text-amber-700 shrink-0" />;
                                        })()}
                                        <h4 className="font-extrabold text-base sm:text-lg">{stickyNotesData[0].title}</h4>
                                    </div>
                                    <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                                        {stickyNotesData[0].desc}
                                    </p>
                                </div>
                            </ScrollReveal>

                            {/* Review Card 1 (WhatsApp Style) */}
                            <ScrollReveal variant="fade-up" delay="delay-200">
                                <div className={`relative bg-slate-900/95 border border-slate-700/80 rounded-2xl p-4 sm:p-5 polaroid-card transition-all duration-300 ${reviewsData[0].rotation}`}>
                                    <PushPin color={reviewsData[0].pinColor} />
                                    
                                    {/* WhatsApp Header */}
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-emerald-700/30 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-black text-sm">
                                                {reviewsData[0].author[2]}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm sm:text-base flex items-center gap-1.5">
                                                    <span>{reviewsData[0].author}</span>
                                                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-extrabold">
                                                        {reviewsData[0].badge}
                                                    </span>
                                                </h4>
                                                <p className="text-slate-400 text-xs font-medium">{reviewsData[0].role}</p>
                                            </div>
                                        </div>
                                        <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-md text-[10px] font-bold">
                                            WhatsApp Chat 💬
                                        </span>
                                    </div>

                                    {/* Star Rating */}
                                    <StarRating rating={reviewsData[0].rating} />

                                    {/* Message Bubble */}
                                    <div className="bg-[#0b141a] text-slate-100 rounded-xl p-3.5 border border-emerald-900/40 text-xs sm:text-sm leading-relaxed font-semibold relative mb-3">
                                        <p className="dir-rtl text-right leading-relaxed">{reviewsData[0].message}</p>
                                        <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-slate-400 font-sans">
                                            <span>{reviewsData[0].time}</span>
                                            <CheckCheck className="w-3.5 h-3.5 text-sky-400" />
                                        </div>
                                    </div>

                                    {/* Photo Attachment if available */}
                                    {reviewsData[0].attachedPhoto && (
                                        <div className="mt-3 relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 group cursor-pointer" onClick={() => setSelectedPhoto(reviewsData[0].attachedPhoto)}>
                                            <img 
                                                src={reviewsData[0].attachedPhoto} 
                                                alt={reviewsData[0].photoCaption}
                                                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100" 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-between p-3">
                                                <span className="text-white text-xs font-bold bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-700">
                                                    {reviewsData[0].photoCaption}
                                                </span>
                                                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                    <ZoomIn className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>

                            {/* Review Card 3 */}
                            <ScrollReveal variant="fade-up" delay="delay-300">
                                <div className={`relative bg-slate-900/95 border border-slate-700/80 rounded-2xl p-4 sm:p-5 polaroid-card transition-all duration-300 ${reviewsData[2].rotation}`}>
                                    <PushPin color={reviewsData[2].pinColor} />
                                    
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-700/30 border border-blue-500/40 text-blue-400 flex items-center justify-center font-black text-sm">
                                                {reviewsData[2].author[0]}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm sm:text-base flex items-center gap-1.5">
                                                    <span>{reviewsData[2].author}</span>
                                                    <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full font-extrabold">
                                                        {reviewsData[2].badge}
                                                    </span>
                                                </h4>
                                                <p className="text-slate-400 text-xs font-medium">{reviewsData[2].role}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <StarRating rating={reviewsData[2].rating} />

                                    <div className="bg-[#0b141a] text-slate-100 rounded-xl p-3.5 border border-emerald-900/40 text-xs sm:text-sm leading-relaxed font-semibold relative mb-3">
                                        <p className="dir-rtl text-right leading-relaxed">{reviewsData[2].message}</p>
                                        <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-slate-400 font-sans">
                                            <span>{reviewsData[2].time}</span>
                                            <CheckCheck className="w-3.5 h-3.5 text-sky-400" />
                                        </div>
                                    </div>

                                    {reviewsData[2].attachedPhoto && (
                                        <div className="mt-3 relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 group cursor-pointer" onClick={() => setSelectedPhoto(reviewsData[2].attachedPhoto)}>
                                            <img 
                                                src={reviewsData[2].attachedPhoto} 
                                                alt={reviewsData[2].photoCaption}
                                                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100" 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-between p-3">
                                                <span className="text-white text-xs font-bold bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-700">
                                                    {reviewsData[2].photoCaption}
                                                </span>
                                                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                    <ZoomIn className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>

                        </div>

                        {/* Right Column Cards (Zigzag Alternating Staggered) */}
                        <div className="space-y-10 md:space-y-14 md:mt-8">

                            {/* Review Card 2 */}
                            <ScrollReveal variant="fade-up" delay="delay-200">
                                <div className={`relative bg-slate-900/95 border border-slate-700/80 rounded-2xl p-4 sm:p-5 polaroid-card transition-all duration-300 ${reviewsData[1].rotation}`}>
                                    <PushPin color={reviewsData[1].pinColor} />
                                    
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-amber-700/30 border border-amber-500/40 text-amber-400 flex items-center justify-center font-black text-sm">
                                                {reviewsData[1].author[2]}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm sm:text-base flex items-center gap-1.5">
                                                    <span>{reviewsData[1].author}</span>
                                                    <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-extrabold">
                                                        {reviewsData[1].badge}
                                                    </span>
                                                </h4>
                                                <p className="text-slate-400 text-xs font-medium">{reviewsData[1].role}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <StarRating rating={reviewsData[1].rating} />

                                    <div className="bg-[#0b141a] text-slate-100 rounded-xl p-3.5 border border-emerald-900/40 text-xs sm:text-sm leading-relaxed font-semibold relative">
                                        <p className="dir-rtl text-right leading-relaxed">{reviewsData[1].message}</p>
                                        <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-slate-400 font-sans">
                                            <span>{reviewsData[1].time}</span>
                                            <CheckCheck className="w-3.5 h-3.5 text-sky-400" />
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Sticky Note 2 */}
                            <ScrollReveal variant="zoom-in" delay="delay-300">
                                <div className={`relative ${stickyNotesData[1].rotation} ${stickyNotesData[1].color} p-5 rounded-sm border-2 shadow-xl polaroid-card transition-all duration-300 hover:scale-105`}>
                                    <PushPin color={stickyNotesData[1].pinColor} />
                                    <ScotchTape className={stickyNotesData[1].tape} />
                                    <div className="flex items-center gap-2.5 mb-2">
                                        {stickyNotesData[1]?.icon && (() => {
                                            const Note2Icon = stickyNotesData[1].icon;
                                            return <Note2Icon className="w-6 h-6 text-emerald-800 shrink-0" />;
                                        })()}
                                        <h4 className="font-extrabold text-base sm:text-lg">{stickyNotesData[1].title}</h4>
                                    </div>
                                    <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                                        {stickyNotesData[1].desc}
                                    </p>
                                </div>
                            </ScrollReveal>

                            {/* Review Card 4 */}
                            <ScrollReveal variant="fade-up" delay="delay-400">
                                <div className={`relative bg-slate-900/95 border border-slate-700/80 rounded-2xl p-4 sm:p-5 polaroid-card transition-all duration-300 ${reviewsData[3].rotation}`}>
                                    <PushPin color={reviewsData[3].pinColor} />
                                    
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-purple-700/30 border border-purple-500/40 text-purple-400 flex items-center justify-center font-black text-sm">
                                                {reviewsData[3].author[2]}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm sm:text-base flex items-center gap-1.5">
                                                    <span>{reviewsData[3].author}</span>
                                                    <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-extrabold">
                                                        {reviewsData[3].badge}
                                                    </span>
                                                </h4>
                                                <p className="text-slate-400 text-xs font-medium">{reviewsData[3].role}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <StarRating rating={reviewsData[3].rating} />

                                    <div className="bg-[#0b141a] text-slate-100 rounded-xl p-3.5 border border-emerald-900/40 text-xs sm:text-sm leading-relaxed font-semibold relative">
                                        <p className="dir-rtl text-right leading-relaxed">{reviewsData[3].message}</p>
                                        <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-slate-400 font-sans">
                                            <span>{reviewsData[3].time}</span>
                                            <CheckCheck className="w-3.5 h-3.5 text-sky-400" />
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                        </div>

                    </div>

                    {/* Bottom CTA Stamp Pinned on Corkboard */}
                    <ScrollReveal variant="zoom-in" delay="delay-300">
                        <div className="mt-12 text-center relative z-20">
                            <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-amber-950/90 border-2 border-amber-600/40 rounded-2xl p-4 sm:px-8 text-amber-200 shadow-2xl polaroid-card">
                                <div className="text-center sm:text-right">
                                    <p className="font-extrabold text-sm sm:text-base text-white">
                                        عايز تشارك رأيك أو تستفسر عن أي جهاز طبي؟
                                    </p>
                                    <p className="text-amber-400/90 text-xs font-bold">
                                        فريق الدعم الفني والاستشاري متواجد 24 ساعة على الواتساب 💬
                                    </p>
                                </div>
                                <a 
                                    href="https://wa.me/201000000000" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors shadow-lg shrink-0 mt-2 sm:mt-0"
                                >
                                    تواصل عبر الواتساب
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>

                </div>

            </div>

            {/* Photo Lightbox Modal */}
            {selectedPhoto && (
                <div 
                    className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <div className="relative max-w-3xl w-full bg-slate-900 border border-slate-700 rounded-3xl p-4 overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        <button 
                            onClick={() => setSelectedPhoto(null)}
                            className="absolute top-4 right-4 z-10 bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <img src={selectedPhoto} alt="Review Attachment" className="w-full h-auto max-h-[80vh] object-contain rounded-2xl" />
                    </div>
                </div>
            )}
        </section>
    );
}

export default CorkboardTrust;
