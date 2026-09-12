import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, CheckCheck } from 'lucide-react';

// Star Rating Component
function StarRating({ rating = 5 }) {
    return (
        <div className="flex items-center gap-0.5 shrink-0">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
            ))}
        </div>
    );
}

const reviewsData = [
    {
        id: 1,
        author: "د. محمد عمرو",
        role: null,
        time: "11:42 AM",
        message: 'تسلم يا هندسة والله معاملة وسرعة استجابة فوق الممتاز وان شاء الله مش هيكون اخر تعامل معاك بإذن الله ❤️',
        rating: 5,
        badge: null,
        avatarBg: "bg-emerald-700/30 border-emerald-500/40 text-emerald-400"
    },
    {
        id: 2,
        author: "د. زياد محمد",
        role: null,
        time: "02:15 PM",
        message: "من احسن الناس الي اتعاملت معاها واتشرفت بمعرفتك والله يا هندسة برا الشغل قبل جوا الشغلة ",
        rating: 5,
        badge: null,
        avatarBg: "bg-amber-700/30 border-amber-500/40 text-amber-400"
    },
    {
        id: 3,
        author: "د. عمر خفاجي",
        role: null,
        time: "06:08 PM",
        message:'شرف ليا يا بشمهندس حسن والله اني اتعاملت معاك ومن اكتر الشركات المحترمة في معادها ومن الناس الجميلة جداً الي اتبسطت في التعامل معاها',
        rating: 5,
        badge: null,
        avatarBg: "bg-blue-700/30 border-blue-500/40 text-blue-400"
    },
    {
        id: 4,
        author: "د. محمد عرفات",
        role: null,
        time: "08:30 PM",
        message: 'انا سعيد اكتر والله يا بشمهندس حسن اني اتعاملت مع حضرتك شخصية محترمة وتدرس فالادب والاخلاق وخدمة ما بعد البيع وان شاء الله مش اخر تعامل معاك يا هندسة',
        rating: 5,
        badge: null,
        avatarBg: "bg-purple-700/30 border-purple-500/40 text-purple-400"
    },
    {
        id: 5,
        author:"د. اواب السيد",
        role: null,
        time: "04:55 PM",
        message: 'دا انا الي اتشرفت بمعرفتك ودا مش اول تعامل مع حضرتك لو تفتكر انا الي خدت من حضرتك في 2024 الDC-7  ودا الي خلاني اجي لحضرتك تاني الاجهزة حالتها فوق الممتاز وطبعا غير تعامل حضرتك وذوقك الحلو',
        rating: 5,
        badge: null,
        avatarBg: "bg-cyan-700/30 border-cyan-500/40 text-cyan-400"
    },
    {
        id: 6,
        author: "د. بلال عمرو",
        role: null,
        time: "09:12 AM",
        message: 'انا مبسوطه اكتر اني اتعاملت مع حضرتك من الناس الخلوقة ومن احسن الشركات الي اتعاملت معاها وربنا يوفقك يا بشمهندس',
        rating: 5,
        badge: null,
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

    // Detect responsive slidesPerView with state guard
    useEffect(() => {
        const updateSlides = () => {
            const w = window.innerWidth;
            const newCount = w >= 1280 ? 3 : w >= 640 ? 2 : 1;
            setSlidesPerView((prev) => (prev !== newCount ? newCount : prev));
        };
        updateSlides();
        window.addEventListener('resize', updateSlides, { passive: true });
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
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 40) {
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
                    آراء عملائنا | <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">ثقة حقيقية</span> 
                </h2>

                <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                    رسائل وتجارب موثقة من الأطباء والمستشفيات والعملاء في كافة محافظات مصر.
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
                            transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
                            willChange: 'transform'
                        }}
                    >
                        {reviewsData.map((item) => (
                            <div 
                                key={item.id} 
                                className="w-full sm:w-1/2 xl:w-1/3 shrink-0 px-2 sm:px-3 flex"
                            >
                                <div className="w-full bg-slate-950/95 border border-slate-800 hover:border-cyan-500/40 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[190px] sm:min-h-[220px] group">
                                    
                                    {/* Author & Star Rating Header */}
                                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3 gap-2">
                                        <h4 className="text-white font-bold text-sm sm:text-base text-right truncate">
                                            {item.author}
                                        </h4>
                                        <StarRating rating={item.rating} />
                                    </div>

                                    {/* Message Bubble & Time */}
                                    <div className="flex-1 bg-[#0b141a]/95 text-slate-100 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-cyan-500/10 text-xs sm:text-sm leading-relaxed font-medium relative shadow-inner flex flex-col justify-between">
                                        <p className="dir-rtl text-right leading-relaxed text-slate-200 line-clamp-4">
                                            {item.message}
                                        </p>
                                        <div className="flex items-center justify-end gap-1.5 mt-2.5 text-[10px] text-slate-400 font-sans">
                                            <span>{item.time}</span>
                                            <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />
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
