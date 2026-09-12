import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Activity } from 'lucide-react';
import gsap from 'gsap';

const descriptionText = "We provide advanced medical equipment and reliable solutions to support healthcare professionals and improve patient care.";

function Landing() {
    const heroRef = useRef(null);
    const words = descriptionText.split(" ");

    useEffect(() => {
        if (!heroRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ 
                defaults: { ease: 'power3.out' },
                delay: 0.1 
            });

            // 1. Eyebrow Badge (Appears 1st)
            tl.fromTo(
                '.hero-eyebrow',
                { opacity: 0, y: -22, scale: 0.92 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5 }
            );

            // 2. Main Title - Line 1 "AMC" (Appears 2nd)
            tl.fromTo(
                '.hero-title-amc',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.55 },
                "-=0.25"
            );

            // 3. Main Title - Line 2 "Medical Solutions" (Appears 3rd)
            tl.fromTo(
                '.hero-title-solutions',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.55 },
                "-=0.35"
            );

            // 4. Byline / Signature (Appears 4th)
            tl.fromTo(
                '.hero-byline',
                { opacity: 0, y: 14, scale: 0.96 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4 },
                "-=0.2"
            );

            // 5. Description Paragraph - Words appear one after another (Appears 5th - Wahed Wra Eltany!)
            tl.fromTo(
                '.hero-desc-word',
                { opacity: 0, y: 12 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.28, 
                    stagger: 0.03 
                },
                "-=0.1"
            );

            // 6. Action CTA Buttons (Appear 6th right after text finishes)
            tl.fromTo(
                '.hero-cta-btn',
                { opacity: 0, y: 20, scale: 0.95 },
                { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    duration: 0.45, 
                    stagger: 0.12,
                    clearProps: "transform,opacity"
                },
                "-=0.1"
            );

            // 7. Slogan badge at bottom
            tl.fromTo(
                '.hero-slogan',
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.6 },
                "-=0.2"
            );
        }, heroRef.current);

        return () => ctx.revert();
    }, []);

    return (
        // Hero Section: Centered Sequential Text with Authentic Medical Live Background
        <section 
            ref={heroRef}
            className="relative min-h-screen pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-24 flex items-center justify-center w-full text-center overflow-hidden bg-transparent" 
        >
            <div className="container relative z-10 w-full px-4 sm:px-6">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-7">
                    

                    {/* 2. Main Title (AMC -> Medical Solutions) */}
                    <h1 className="tracking-tight leading-none text-center">
                        <span className="hero-title-amc text-6xl sm:text-7xl lg:text-8xl font-black text-white block drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
                            AMC
                        </span>
                        <span className="hero-title-solutions text-3xl sm:text-5xl lg:text-6xl font-black block mt-3 bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_10px_20px_rgba(0,229,255,0.2)]">
                            Medical Solutions
                        </span>
                    </h1>

                    {/* 3. Byline / Signature */}
                    <div className="hero-byline flex items-center justify-center gap-2">
                        <span className="w-6 h-[1px] bg-cyan-400/50 hidden sm:inline-block"></span>
                        <span className="text-cyan-300/90 font-bold text-xs sm:text-sm tracking-widest uppercase block text-center">
                            By: ENG Hassan elkhawaga
                        </span>
                        <span className="w-6 h-[1px] bg-cyan-400/50 hidden sm:inline-block"></span>
                    </div>

                    {/* 4. Description Paragraph (Every word reveals sequentially one after another) */}
                    <p className="text-slate-200/90 text-base sm:text-lg lg:text-xl leading-relaxed font-medium max-w-2xl mx-auto text-center drop-shadow-md">
                        {words.map((word, idx) => (
                            <span 
                                key={idx} 
                                className="hero-desc-word inline-block transform-gpu"
                            >
                                {word}&nbsp;
                            </span>
                        ))}
                    </p>

                    {/* 5. Premium Call to Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center items-center pt-2">
                        {/* Primary Button: Glowing Electric Cyan (matching reference banner) */}
                        <Link 
                            to="/products" 
                            className="hero-cta-btn group flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 px-7 py-3.5 text-sm sm:text-base rounded-2xl font-black tracking-wide shadow-xl shadow-cyan-400/30 hover:shadow-2xl hover:shadow-cyan-400/40 hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100 transition-all duration-300 cursor-pointer"
                        >
                            <span>Products</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 group-hover:translate-x-1.5 transition-transform duration-300" />
                        </Link>
                        {/* Secondary Button: Frost Glass Accent with Cyan Glow */}
                        <Link 
                            to="/contact" 
                            className="hero-cta-btn bg-slate-950/60 hover:bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400 text-white px-7 py-3.5 text-sm sm:text-base rounded-2xl font-bold tracking-wide backdrop-blur-md hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100 shadow-lg shadow-black/40 transition-all duration-300 cursor-pointer"
                        >
                            Contact Us
                        </Link>
                    </div>

                </div>
            </div>

            {/* Bottom Slogan matching user's reference mockup */}
            <div className="hero-slogan hidden lg:flex items-center gap-3 absolute bottom-8 left-10 text-xs font-bold tracking-widest text-slate-300/80 uppercase pointer-events-none">
                <span className="w-8 h-[2px] bg-cyan-400 inline-block shadow-sm shadow-cyan-400"></span>
                <span>BETTER EQUIPMENT &nbsp;|&nbsp; HEALTHIER TOMORROW</span>
            </div>
        </section>
    );
}

export default Landing;