import { memo } from 'react';

/**
 * GlobalAnimatedBackground Component
 * Ultra-High-Performance Medical Live Background:
 * - 100% GPU-accelerated with pure CSS keyframes (Zero JS overhead, zero main-thread blocking)
 * - Compressed authentic medical backdrop with async decoding
 * - Traveling electric cyan energy beams tracing orbital arcs
 * - Undulating particle wave & ambient breathing glowing orbs
 * - Renders instantly on frame 0 without waiting for script evaluations
 */
function GlobalAnimatedBackground() {
    // Sweeping vector trajectories
    const arcPath1 = "M -60 700 C 40 400, 160 120, 480 80 C 760 40, 1020 180, 1260 380";
    const arcPath2 = "M -100 820 C 180 720, 420 620, 720 540 C 980 460, 1180 340, 1340 180";
    const arcPath3 = "M 150 900 C 480 780, 800 660, 1150 620 C 1350 600, 1450 620, 1600 660";
    const arcPath4 = "M -50 480 C 320 620, 680 740, 1050 680 C 1280 640, 1420 510, 1550 440";

    return (
        <div 
            className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
            aria-hidden="true"
        >
            {/* 1. Deep Surgical Midnight Canvas Base */}
            <div className="absolute inset-0 bg-[#020712]" />

            {/* 2. Authentic Medical Live Backdrop (Optimized 72KB with async decoding) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img 
                    src="/images/medical-live-bg.jpg" 
                    alt="" 
                    decoding="async"
                    loading="eager"
                    className="w-full h-full object-cover object-center opacity-65 scale-[1.02] transform-gpu filter brightness-95 contrast-105"
                />
                {/* Soft gradient blend for dark UI readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#020712]/75 via-[#020712]/30 to-[#020712]/85" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020712]/60 via-transparent to-[#020712]/60" />
            </div>

            {/* 3. Ambient Soft Glowing Medical Orbs (Pure CSS Breathing) */}
            <div className="absolute inset-0 pointer-events-none animate-orb-breath">
                <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] bg-cyan-500/15 rounded-full blur-[100px]" />
                <div className="absolute top-1/4 left-1/3 w-[26rem] h-[26rem] bg-blue-600/15 rounded-full blur-[80px]" />
                <div className="absolute -bottom-24 right-1/4 w-[36rem] h-[36rem] bg-sky-400/15 rounded-full blur-[100px]" />
                <div className="absolute top-10 right-10 w-[24rem] h-[24rem] bg-teal-400/10 rounded-full blur-[80px]" />
            </div>

            {/* 4. Subtle Digital Tech Dot Matrix Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#00e5ff_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-10" />

            {/* 5. Sweeping Vector Arcs & Continuous Energy Beams */}
            <svg 
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1440 900"
                preserveAspectRatio="xMidYMid slice"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="globalBeamGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.1" />
                        <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.85" />
                        <stop offset="70%" stopColor="#00e5ff" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
                    </linearGradient>

                    <linearGradient id="globalBeamGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.1" />
                        <stop offset="45%" stopColor="#67e8f9" stopOpacity="0.95" />
                        <stop offset="75%" stopColor="#00e5ff" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.15" />
                    </linearGradient>

                    <linearGradient id="globalBeamGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.05" />
                        <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.05" />
                    </linearGradient>
                </defs>

                {/* --- LAYER A: Main Upper Orbital Arc --- */}
                <g>
                    <path 
                        d={arcPath1} 
                        stroke="#38bdf8" 
                        strokeWidth="1.5" 
                        strokeDasharray="4 8"
                        opacity="0.25" 
                        fill="none" 
                    />
                    <path 
                        d={arcPath1} 
                        stroke="#0ea5e9" 
                        strokeWidth="6" 
                        opacity="0.2" 
                        strokeLinecap="round"
                        fill="none" 
                    />
                    <path 
                        d={arcPath1} 
                        stroke="url(#globalBeamGrad1)" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                        strokeDasharray="220 380"
                        className="animate-beam-1"
                        fill="none" 
                    />
                </g>

                {/* --- LAYER B: Lower High-Speed Energy Beam Arc --- */}
                <g>
                    <path 
                        d={arcPath2} 
                        stroke="#67e8f9" 
                        strokeWidth="1.5" 
                        strokeDasharray="3 6"
                        opacity="0.3" 
                        fill="none" 
                    />
                    <path 
                        d={arcPath2} 
                        stroke="#00e5ff" 
                        strokeWidth="5" 
                        opacity="0.2" 
                        strokeLinecap="round"
                        fill="none" 
                    />
                    <path 
                        d={arcPath2} 
                        stroke="url(#globalBeamGrad2)" 
                        strokeWidth="3.2" 
                        strokeLinecap="round" 
                        strokeDasharray="180 320"
                        className="animate-beam-2"
                        fill="none" 
                    />
                    <path 
                        d={arcPath3} 
                        stroke="#38bdf8" 
                        strokeWidth="1.5" 
                        opacity="0.2" 
                        fill="none" 
                    />
                </g>

                {/* --- LAYER C: Middle/Lower Traveling Beam Arc --- */}
                <g>
                    <path 
                        d={arcPath4} 
                        stroke="#38bdf8" 
                        strokeWidth="1.2" 
                        opacity="0.2" 
                        fill="none" 
                    />
                    <path 
                        d={arcPath4} 
                        stroke="url(#globalBeamGrad3)" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeDasharray="180 340"
                        className="animate-beam-3"
                        fill="none" 
                    />
                </g>

                {/* --- LAYER D: Undulating Medical Tech Particle Wave --- */}
                <g className="animate-particles" opacity="0.45">
                    <circle cx="340" cy="180" r="2.5" fill="#38bdf8" />
                    <circle cx="480" cy="140" r="3" fill="#ffffff" />
                    <circle cx="620" cy="190" r="2" fill="#67e8f9" />
                    <circle cx="780" cy="260" r="3.5" fill="#38bdf8" />
                    <circle cx="920" cy="340" r="2" fill="#ffffff" />
                    <circle cx="1060" cy="410" r="2.5" fill="#67e8f9" />
                    
                    <circle cx="280" cy="680" r="2" fill="#38bdf8" />
                    <circle cx="450" cy="610" r="3" fill="#ffffff" />
                    <circle cx="680" cy="560" r="3" fill="#67e8f9" />
                    <circle cx="840" cy="500" r="2" fill="#38bdf8" />
                    <circle cx="1020" cy="430" r="3" fill="#ffffff" />

                    <circle cx="180" cy="480" r="2" fill="#38bdf8" />
                    <circle cx="560" cy="580" r="2.5" fill="#ffffff" />
                    <circle cx="1180" cy="520" r="2" fill="#67e8f9" />
                </g>
            </svg>
        </div>
    );
}

export default memo(GlobalAnimatedBackground);
