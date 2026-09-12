import { memo } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const descriptionText = "We provide advanced medical equipment and reliable solutions to support healthcare professionals and improve patient care.";

function Landing() {
    return (
        <section 
            className="relative min-h-screen pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-24 flex items-center justify-center w-full text-center overflow-hidden bg-transparent" 
        >
            <div className="container relative z-10 w-full px-4 sm:px-6">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-7">
                    
                    {/* 1. Main Title (AMC -> Medical Solutions) */}
                    <h1 className="tracking-tight leading-none text-center">
                        <span className="hero-anim-1 text-6xl sm:text-7xl lg:text-8xl font-black text-white block drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
                            AMC
                        </span>
                        <span className="hero-anim-2 text-3xl sm:text-5xl lg:text-6xl font-black block mt-3 bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_10px_20px_rgba(0,229,255,0.2)]">
                            Medical Solutions
                        </span>
                    </h1>

                    {/* 2. Byline / Signature */}
                    <div className="hero-anim-3 flex items-center justify-center gap-2">
                        <span className="w-6 h-[1px] bg-cyan-400/50 hidden sm:inline-block"></span>
                        <span className="text-cyan-300/90 font-bold text-xs sm:text-sm tracking-widest uppercase block text-center">
                            By: ENG Hassan elkhawaga
                        </span>
                        <span className="w-6 h-[1px] bg-cyan-400/50 hidden sm:inline-block"></span>
                    </div>

                    {/* 3. Description Paragraph */}
                    <p className="hero-anim-4 text-slate-200/90 text-base sm:text-lg lg:text-xl leading-relaxed font-medium max-w-2xl mx-auto text-center drop-shadow-md">
                        {descriptionText}
                    </p>

                    {/* 4. Call to Action Buttons */}
                    <div className="hero-anim-5 flex flex-wrap gap-4 justify-center items-center pt-2">
                        {/* Primary Button */}
                        <Link 
                            to="/products" 
                            className="group flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 px-7 py-3.5 text-sm sm:text-base rounded-2xl font-black tracking-wide shadow-xl shadow-cyan-400/30 hover:shadow-2xl hover:shadow-cyan-400/40 hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100 transition-all duration-300 cursor-pointer"
                        >
                            <span>Products</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 group-hover:translate-x-1.5 transition-transform duration-300" />
                        </Link>
                        {/* Secondary Button */}
                        <Link 
                            to="/contact" 
                            className="bg-slate-950/60 hover:bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400 text-white px-7 py-3.5 text-sm sm:text-base rounded-2xl font-bold tracking-wide backdrop-blur-md hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100 shadow-lg shadow-black/40 transition-all duration-300 cursor-pointer"
                        >
                            Contact Us
                        </Link>
                    </div>

                </div>
            </div>

            {/* 5. Bottom Slogan */}
            <div className="hero-anim-6 hidden lg:flex items-center gap-3 absolute bottom-8 left-10 text-xs font-bold tracking-widest text-slate-300/80 uppercase pointer-events-none">
                <span className="w-8 h-[2px] bg-cyan-400 inline-block shadow-sm shadow-cyan-400"></span>
                <span>BETTER EQUIPMENT &nbsp;|&nbsp; HEALTHIER TOMORROW</span>
            </div>
        </section>
    );
}

export default memo(Landing);