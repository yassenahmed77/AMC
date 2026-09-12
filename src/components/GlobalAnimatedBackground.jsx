import { memo } from 'react';

/**
 * GlobalAnimatedBackground Component
 * Ultra-Lightweight, High-Performance Medical Live Background:
 * - 100% GPU Hardware-Accelerated with Native CSS Compositing
 * - Zero heavy blur-filter repaints (replaces dynamic gaussian blurs with cached radial gradients)
 * - Pure CSS stroke animation with strict layout containment
 * - Zero JS execution overhead, zero frame drops during scrolling
 */
function GlobalAnimatedBackground() {
    // Sweeping vector trajectories
    const arcPath1 = "M -60 700 C 40 400, 160 120, 480 80 C 760 40, 1020 180, 1260 380";
    const arcPath2 = "M -100 820 C 180 720, 420 620, 720 540 C 980 460, 1180 340, 1340 180";
    const arcPath4 = "M -50 480 C 320 620, 680 740, 1050 680 C 1280 640, 1420 510, 1550 440";

    return (
        <div 
            className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none"
            style={{ contain: 'strict', willChange: 'auto' }}
            aria-hidden="true"
        >
            {/* 1. Deep Surgical Midnight Canvas Base */}
            <div className="absolute inset-0 bg-[#020712]" />

            {/* 2. Authentic Medical Live Backdrop (Optimized async image without heavy CSS filters) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img 
                    src="/images/medical-live-bg.jpg" 
                    alt="" 
                    decoding="async"
                    loading="eager"
                    className="w-full h-full object-cover object-center opacity-60 pointer-events-none"
                />
                {/* Soft gradient blends for dark UI readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#020712]/80 via-[#020712]/40 to-[#020712]/90" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020712]/60 via-transparent to-[#020712]/60" />
            </div>

            {/* 3. Ambient Soft Glowing Medical Lighting (Pure Cached Radial Gradients + Pure GPU Breathing) */}
            <div 
                className="absolute inset-0 pointer-events-none animate-orb-breath"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 10% 15%, rgba(6, 182, 212, 0.14) 0%, transparent 45%),
                        radial-gradient(circle at 85% 25%, rgba(20, 184, 166, 0.10) 0%, transparent 40%),
                        radial-gradient(circle at 50% 65%, rgba(56, 189, 248, 0.12) 0%, transparent 50%),
                        radial-gradient(circle at 90% 85%, rgba(14, 165, 233, 0.10) 0%, transparent 45%)
                    `
                }}
            />

            {/* 4. Subtle Digital Tech Dot Matrix Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />

            {/* 5. Sweeping Vector Arcs & Energy Beams (Zero-JS GPU Accelerated Vectors) */}
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
                        <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.8" />
                        <stop offset="70%" stopColor="#00e5ff" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
                    </linearGradient>

                    <linearGradient id="globalBeamGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="#67e8f9" stopOpacity="0.9" />
                        <stop offset="80%" stopColor="#00e5ff" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
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
                        stroke="url(#globalBeamGrad1)" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                        strokeDasharray="220 380"
                        className="animate-beam-1"
                        opacity="0.85"
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
                        stroke="url(#globalBeamGrad2)" 
                        strokeWidth="2.8" 
                        strokeLinecap="round" 
                        strokeDasharray="180 320"
                        className="animate-beam-2"
                        opacity="0.8"
                        fill="none" 
                    />
                </g>

                {/* --- LAYER C: Traveling Accent Beam Arc --- */}
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
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeDasharray="180 340"
                        className="animate-beam-3"
                        opacity="0.75"
                        fill="none" 
                    />
                </g>

                {/* --- LAYER D: Floating Micro-Particles --- */}
                <g className="animate-particles" opacity="0.45">
                    <circle cx="340" cy="180" r="2" fill="#38bdf8" />
                    <circle cx="480" cy="140" r="2.5" fill="#ffffff" />
                    <circle cx="620" cy="190" r="2" fill="#67e8f9" />
                    <circle cx="780" cy="260" r="2.5" fill="#38bdf8" />
                    <circle cx="920" cy="340" r="2" fill="#ffffff" />
                    <circle cx="280" cy="680" r="2" fill="#38bdf8" />
                    <circle cx="450" cy="610" r="2.5" fill="#ffffff" />
                    <circle cx="680" cy="560" r="2.5" fill="#67e8f9" />
                    <circle cx="840" cy="500" r="2" fill="#38bdf8" />
                </g>
            </svg>
        </div>
    );
}

export default memo(GlobalAnimatedBackground);
