import { Link } from 'react-router';
import { HeartPulse, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import bannerImg from '../../assets/banner.webp';

function Landing() {
    const [count, setCount] = useState(0);

    // Counter animation to count up from 0 to 99 on load
    useEffect(() => {
        let start = 0;
        const end = 99;
        if (start === end) return;
        
        let duration = 1200; // total animation time in ms
        let incrementTime = Math.abs(Math.floor(duration / end));
        
        let timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);
        
        return () => clearInterval(timer);
    }, []);

    return (
        // Banner Section: Preloaded bundled background image via Vite import
        <section 
            className="min-h-[calc(100vh-88px)] lg:h-[calc(100vh-120px)] py-12 lg:py-0 flex items-center justify-center bg-cover bg-center bg-no-repeat w-full text-center" 
            style={{ backgroundImage: `url(${bannerImg})` }}
        >
            <div className="container w-full">
                {/* Responsive Flex Layout: Stacks & centers on mobile, splits side-by-side on desktop */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 w-full">
                    
                    {/* Left Column: Larger space for text (flex-[3_3_0%] on desktop, centered on mobile) */}
                    <div className="flex-1 lg:flex-[3_3_0%] flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                        
                        {/* Live Pulse Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">
                            <span className="w-2.5 h-2.5 rounded-full bg-primarycolor animate-pulse" />
                            <span>Trusted Medical Care</span>
                        </div>

                        {/* Welcome Row with Icon */}
                        <div className="flex items-center justify-center lg:justify-start gap-2 text-primarycolor font-extrabold tracking-wide uppercase text-sm sm:text-base">
                            <span>Welcome to</span>
                            <HeartPulse className="w-5 h-5 animate-pulse" />
                        </div>

                        {/* Mixed Colors and Gradient Title */}
                        <h1 className="tracking-tight leading-none text-center lg:text-left">
                            <span className="text-6xl sm:text-7xl lg:text-8xl font-black text-white block">AMC</span>
                            <span className="text-3xl sm:text-5xl lg:text-6xl font-black block mt-3 bg-gradient-to-r from-primarycolor to-maincolor bg-clip-text text-transparent whitespace-nowrap">
                                Medical Solutions
                            </span>
                        </h1>

                        {/* Signature */}
                        <span className="bg-gradient-to-r from-primarycolor to-white bg-clip-text text-transparent font-bold text-xs sm:text-sm tracking-widest uppercase block text-center lg:text-left">
                            By: ENG Hassan elkhawaga
                        </span>

                        {/* Description Paragraph */}
                        <p className="text-slate-200 text-base sm:text-lg lg:text-xl leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                            We provide advanced medical equipment and reliable solutions to support healthcare professionals and improve patient care.
                        </p>

                        {/* Premium Call to Actions */}
                        <div className="flex gap-4 justify-center lg:justify-start pt-2">
                            {/* Primary Button */}
                            <Link to="/products" className="group flex items-center gap-2 bg-gradient-to-r from-primarycolor to-orange-400 text-white px-3.5 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-xl font-bold tracking-wide shadow-lg shadow-primarycolor/20 hover:shadow-xl hover:shadow-primarycolor/40 hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100 transition-all duration-300 cursor-pointer">
                                <span>Products</span>
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                            </Link>
                            {/* Secondary Button */}
                            <Link to="/contact" className="border-2 border-white/60 text-white px-3.5 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-xl font-bold tracking-wide backdrop-blur-sm hover:bg-white hover:text-maincolor hover:border-white hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 cursor-pointer">
                                Contact Us
                            </Link>
                        </div>

                    </div>

                    {/* Right Column: Smaller space for counter (flex-[2_2_0%] on desktop, centered on mobile) */}
                    <div className="flex-1 lg:flex-[2_2_0%] flex justify-center lg:justify-end items-center w-full">
                        <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col items-center text-center  space-y-2 hover:bg-white/15 transition-all duration-300 w-full lg:w-auto max-w-[280px] lg:max-w-none">
                            <span className="text-5xl sm:text-7xl font-black text-primarycolor tracking-tight">+{count}</span>
                            <p className="text-white text-base sm:text-lg font-bold tracking-wide max-w-[220px] leading-snug">Doctors & Hospitals Trusted Us</p>
                            <p className="text-white/60 text-xs sm:text-sm font-semibold">New & Premium Used Devices</p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default Landing;