import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const partnerImages = [
    { id: 1, src: '/images/partners/mindray-partner-1.jpg?v=20260909_4', alt: 'Mindray Ultrasound Partnership', position: 'object-center' },
    { id: 2, src: '/images/partners/mindray-partner-2.jpg?v=20260909_4', alt: 'Clinical Ultrasound Installation', position: 'object-[center_35%]' },
    { id: 3, src: '/images/partners/mindray-partner-3.jpg?v=20260909_4', alt: 'Mindray Dubai 2018 Award', position: 'object-center' },
    { id: 4, src: '/images/partners/mindray-partner-4.jpg?v=20260909_4', alt: 'International Healthcare Excellence Award', position: 'object-center' },
    { id: 5, src: '/images/partners/mindray-partner-5.jpg?v=20260909_4', alt: 'Global Medical Partners Delegation', position: 'object-center' },
];

function PartnersSwiper() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <section className="py-8 sm:py-16 relative overflow-hidden bg-[#020712]/70 select-none">
            
            {/* Header / Intro */}
            <div className="container relative z-10 text-center max-w-2xl mx-auto mb-5 sm:mb-10 px-4">
                {/* Clean Eyebrow: — OUR PARTNERS — */}
                <p className="text-cyan-400 text-xs sm:text-sm font-black uppercase tracking-widest mb-2.5">
                    — OUR PARTNERS —
                </p>

                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight mb-2">
                    شركاء <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">النجاح</span> | REAL IMPACT
                </h2>

                {/* Short, punchy 1-line subtitle */}
                <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                    جانب من ثقة شركائنا ونخبة أطباء ومستشفيات مصر في تجهيزات AMC الطبية.
                </p>
            </div>

            {/* Carousel Container */}
            <div className="relative w-full max-w-6xl mx-auto px-2 sm:px-6">
                
                {/* Navigation Buttons (Desktop only) */}
                <button 
                    ref={prevRef}
                    aria-label="Previous Partner Slide"
                    className="partner-swiper-prev hidden md:flex absolute left-0 lg:-left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-slate-950/90 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 border border-cyan-500/40 hover:border-cyan-300 items-center justify-center shadow-2xl shadow-cyan-950/80 backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer disabled:opacity-20 group"
                >
                    <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                </button>

                <button 
                    ref={nextRef}
                    aria-label="Next Partner Slide"
                    className="partner-swiper-next hidden md:flex absolute right-0 lg:-right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-slate-950/90 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 border border-cyan-500/40 hover:border-cyan-300 items-center justify-center shadow-2xl shadow-cyan-950/80 backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer disabled:opacity-20 group"
                >
                    <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Swiper: Centered active slide with half of left & right peeking */}
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    centeredSlides={true}
                    loop={true}
                    grabCursor={true}
                    speed={600}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    pagination={{
                        clickable: true,
                        el: '.partner-swiper-pagination',
                        bulletClass: 'partner-swiper-bullet',
                        bulletActiveClass: 'partner-swiper-bullet-active',
                    }}
                    slidesPerView={1.45}
                    spaceBetween={14}
                    breakpoints={{
                        640: {
                            slidesPerView: 2.1,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 2.8,
                            spaceBetween: 24,
                        }
                    }}
                    className="partner-swiper-instance w-full py-4"
                >
                    {partnerImages.map((slide) => (
                        <SwiperSlide key={slide.id} className="partner-slide-item">
                            {/* Slide Box: fills its card, full width inside its container, rounded with sleek border */}
                            <div className="partner-card-inner relative w-full h-[350px] xs:h-[390px] sm:h-[430px] md:h-[460px] lg:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl transition-all duration-500">
                                {/* The image inside its box takes full width of the box without distortion */}
                                <img 
                                    src={slide.src} 
                                    alt={slide.alt}
                                    className={`w-full h-full object-cover ${slide.position || 'object-center'} block`}
                                    loading="lazy"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Pagination Indicator */}
                <div className="partner-swiper-pagination flex items-center justify-center gap-2 mt-4 sm:mt-6" />

            </div>

            {/* Custom CSS for scaling active slide & peeking side slides */}
            <style>{`
                .partner-swiper-instance .partner-slide-item {
                    transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease;
                    transform: scale(0.88);
                    opacity: 0.45;
                }
                .partner-swiper-instance .swiper-slide-active {
                    transform: scale(1) !important;
                    opacity: 1 !important;
                    z-index: 20;
                }
                .partner-swiper-instance .swiper-slide-active .partner-card-inner {
                    border-color: rgba(6, 182, 212, 0.6) !important;
                    box-shadow: 0 12px 35px -8px rgba(6, 182, 212, 0.4), 0 0 20px rgba(6, 182, 212, 0.15);
                }
                .partner-swiper-bullet {
                    width: 10px;
                    height: 10px;
                    border-radius: 9999px;
                    background-color: rgba(255, 255, 255, 0.25);
                    transition: all 0.3s ease;
                    cursor: pointer;
                    display: inline-block;
                }
                .partner-swiper-bullet-active {
                    width: 32px;
                    border-radius: 9999px;
                    background-color: #06b6d4;
                    box-shadow: 0 0 12px rgba(6, 182, 212, 0.8);
                }
            `}</style>

        </section>
    );
}

export default PartnersSwiper;
