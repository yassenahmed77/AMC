import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, CheckCheck, MessageCircle } from 'lucide-react';

// Star Rating Component
function StarRating({ rating = 5 }) {
    return (
        <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
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
        badge: "طلب مؤكد ✔️",
        avatarBg: "bg-emerald-700/30 border-emerald-500/40 text-emerald-400"
    },
    {
        id: 2,
        author: "م. طارق حسن",
        role: "المقطم - القاهرة",
        time: "02:15 PM",
        message: "جهاز البيباب والسباب CPAP فتح الرئة والتنفس بقى مريح جداً للوالد. ومتابعة المهندس الفني من الشحنة للتركيب كانت قمة في الاحترافية والذوق 💯✨",
        rating: 5,
        badge: "عميل VIP ⭐️",
        avatarBg: "bg-amber-700/30 border-amber-500/40 text-amber-400"
    },
    {
        id: 3,
        author: "الحاجة فاطمة وعائلتها",
        role: "سموحة - الإسكندرية",
        time: "06:08 PM",
        message: "السرير الطبي الكهربائي 3 حركة ممتاز وسهل الاستخدام جداً.. والضمان والتركيب تم في البيت ببراعة. ربنا يبارك فيكم وفي أمانتكم 💙",
        rating: 5,
        badge: "شحن سريع 🚚",
        avatarBg: "bg-blue-700/30 border-blue-500/40 text-blue-400"
    },
    {
        id: 4,
        author: "د. سارة رشدي",
        role: "استشاري رعاية مركزة - الجيزة",
        time: "08:30 PM",
        message: "تعاملت مع شركات كتير لكن AMC بيتميزوا بالأمانة، أجهزة جديدة زيرو وبضمان حقيقي والدعم الفني معاك 24 ساعة. بنرشحكم دائماً لكل المرضى والعيادات 🌿",
        rating: 5,
        badge: "استشاري طب 🩺",
        avatarBg: "bg-purple-700/30 border-purple-500/40 text-purple-400"
    },
    {
        id: 5,
        author: "د. أحمد عبد الرحمن",
        role: "مركز المنصورة للأشعة",
        time: "04:55 PM",
        message: "تجهيز قسم السونار بأجهزة Mindray تمت في وقت قياسي وبأعلى معايير الدقة. الدعم الهندسي وتدريب الأطباء كان ممتازاً جداً. فخورين بالتعامل معكم 🏆",
        rating: 5,
        badge: "مركز معتمد 🏥",
        avatarBg: "bg-cyan-700/30 border-cyan-500/40 text-cyan-400"
    },
    {
        id: 6,
        author: "د. إبراهيم فؤاد",
        role: "مجمع العيادات التخصصية - طنطا",
        time: "09:12 AM",
        message: "أجهزة رسم القلب ومونيتور المريض من AMC بتوفر قراءات دقيقة ومستقرة للغاية. التوريد كان سريع جداً وخدمة ما بعد البيع فوق الممتازة ⭐️",
        rating: 5,
        badge: "طبيب معتمد 🩺",
        avatarBg: "bg-teal-700/30 border-teal-500/40 text-teal-400"
    }
];

function ReviewsSwiper() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [slidesPerView, setSlidesPerView] = useState(1);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const total = reviewsData.length;

    // Detect responsive slidesPerView
    useEffect(() => {
        const updateSlides = () => {
            if (window.innerWidth >= 1280) {
                setSlidesPerView(3);
            } else if (window.innerWidth >= 640) {
                setSlidesPerView(2);
            } else {
                setSlidesPerView(1);
            }
        };
        updateSlides();
        window.addEventListener('resize', updateSlides);
        return () => window.removeEventListener('resize', updateSlides);
    }, []);

    const maxIndex = Math.max(0, total - slidesPerView);

    // Next slide
    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    // Previous slide
    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    }, [maxIndex]);

    // Auto-advance every 4 seconds (pauses on hover)
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(nextSlide, 4000);
        return () => clearInterval(timer);
    }, [isPaused, nextSlide]);

    // Touch swipe handlers
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    };

    return (
        <section 
            className="py-12 sm:py-20 relative overflow-hidden bg-transparent select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Header / Intro */}
            <div className="container relative z-10 text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
                <p className="text-cyan-400 text-xs sm:text-sm font-black uppercase tracking-widest mb-2.5">
                    — REAL CLIENT REVIEWS —
                </p>

                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight mb-3">
                    آراء عملائنا | <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">ثقة حقيقية</span> 💬
                </h2>

                <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                    رسائل واتساب وتجارب موثقة من الأطباء والمستشفيات والعملاء في كافة محافظات مصر.
                </p>
            </div>

            {/* Carousel Container */}
            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8">
                
                {/* Navigation Buttons (Desktop) */}
                <button 
                    onClick={prevSlide}
                    aria-label="Previous Review Slide"
                    className="hidden md:flex absolute -left-2 lg:-left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-2xl bg-slate-950/90 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 border border-cyan-500/40 hover:border-cyan-300 items-center justify-center shadow-2xl shadow-cyan-950/80 backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
                >
                    <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                </button>

                <button 
                    onClick={nextSlide}
                    aria-label="Next Review Slide"
                    className="hidden md:flex absolute -right-2 lg:-right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-2xl bg-slate-950/90 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 border border-cyan-500/40 hover:border-cyan-300 items-center justify-center shadow-2xl shadow-cyan-950/80 backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
                >
                    <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Pure React Native Slider (Zero-Dependency) */}
                <div 
                    className="overflow-hidden py-4"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div 
                        className="flex transition-transform duration-500 ease-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`
                        }}
                    >
                        {reviewsData.map((item) => (
                            <div 
                                key={item.id} 
                                className="w-full sm:w-1/2 xl:w-1/3 shrink-0 px-2 sm:px-3 flex"
                            >
                                <div className="w-full bg-slate-950/95 border border-slate-700/80 hover:border-cyan-400/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[280px] sm:min-h-[290px] group">
                                    
                                    {/* WhatsApp Header */}
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full border ${item.avatarBg} flex items-center justify-center font-black text-sm shrink-0`}>
                                                {item.author[2] || item.author[0]}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm sm:text-base flex items-center gap-1.5">
                                                    <span>{item.author}</span>
                                                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-extrabold">
                                                        {item.badge}
                                                    </span>
                                                </h4>
                                                <p className="text-slate-400 text-xs font-medium">{item.role}</p>
                                            </div>
                                        </div>
                                        <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 shrink-0">
                                            <MessageCircle size={12} />
                                            <span>WhatsApp</span>
                                        </span>
                                    </div>

                                    {/* Star Rating */}
                                    <StarRating rating={item.rating} />

                                    {/* Message Bubble with equal height expansion */}
                                    <div className="flex-1 bg-[#0b141a] text-slate-100 rounded-2xl p-3.5 sm:p-4 border border-emerald-900/40 text-xs sm:text-sm leading-relaxed font-medium relative shadow-inner flex flex-col justify-between">
                                        <p className="dir-rtl text-right leading-relaxed line-clamp-3">
                                            {item.message}
                                        </p>
                                        <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-slate-400 font-sans">
                                            <span>{item.time}</span>
                                            <CheckCheck className="w-3.5 h-3.5 text-sky-400" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex items-center justify-center gap-2 mt-5 sm:mt-8">
                    {[...Array(maxIndex + 1)].map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            aria-label={`Go to review ${idx + 1}`}
                            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                                currentIndex === idx 
                                    ? 'w-8 bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]' 
                                    : 'w-2.5 bg-white/25 hover:bg-white/50'
                            }`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

export default ReviewsSwiper;
