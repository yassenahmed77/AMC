import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * MedicalTelemetryBackground
 * Full-website authentic medical telemetry background:
 * - Deep Surgical Midnight base (#020712 -> #040e20)
 * - Hospital-grade Medical Cross (+) Telemetry Matrix Pattern
 * - Animated ECG / Heartbeat Vital Wave (ICU monitor cardiac pulse)
 * - Atmospheric Cyan & Oxygen Blue glow orbs
 * - 100% GPU-accelerated with zero scroll or CPU overhead
 */
function MedicalTelemetryBackground() {
    const ecgBeam1Ref = useRef(null);
    const ecgBeam2Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Live ECG Cardiac Pulse Animation (traveling laser scan beam like an ICU monitor)
            if (ecgBeam1Ref.current) {
                gsap.to(ecgBeam1Ref.current, {
                    strokeDashoffset: -2400,
                    duration: 5,
                    ease: 'none',
                    repeat: -1,
                });
            }

            if (ecgBeam2Ref.current) {
                gsap.to(ecgBeam2Ref.current, {
                    strokeDashoffset: -2400,
                    duration: 7,
                    delay: 2,
                    ease: 'none',
                    repeat: -1,
                });
            }
        });

        return () => ctx.revert();
    }, []);

    // Standard P-Q-R-S-T Cardiac Cycle Path Template (repeated across 1200px width)
    const ecgSegment = "L 60 50 L 75 42 L 85 50 L 100 50 L 110 68 L 122 10 L 134 78 L 142 50 L 160 50 L 175 38 L 190 50 L 280 50";
    const fullEcgPath = `M -20 50 ${ecgSegment} 
                        L 360 50 ${ecgSegment.replace(/\b(\d+)\b/g, (m) => +m + 280)} 
                        L 640 50 ${ecgSegment.replace(/\b(\d+)\b/g, (m) => +m + 560)} 
                        L 920 50 ${ecgSegment.replace(/\b(\d+)\b/g, (m) => +m + 840)} 
                        L 1220 50`;

    return (
        <div 
            className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden" 
            aria-hidden="true"
        >
            {/* 1. Deep Surgical Midnight Canvas */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020712] via-[#040d1e] to-[#020712]" />

            {/* 2. Atmospheric Medical Cyan & Oxygen Glow Orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-32 left-1/4 w-[40rem] h-[40rem] bg-cyan-500/[0.08] rounded-full blur-[130px]" />
                <div className="absolute top-1/3 -right-24 w-[36rem] h-[36rem] bg-blue-600/[0.07] rounded-full blur-[120px]" />
                <div className="absolute top-2/3 -left-20 w-[38rem] h-[38rem] bg-sky-500/[0.07] rounded-full blur-[130px]" />
                <div className="absolute -bottom-24 right-1/3 w-[34rem] h-[34rem] bg-teal-400/[0.06] rounded-full blur-[120px]" />
            </div>

            {/* 3. Medical Cross (+) Telemetry Matrix Blueprint */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.14]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="medicalCrossGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                        {/* Hospital Telemetry Cross Symbol */}
                        <path 
                            d="M 24 19 L 24 29 M 19 24 L 29 24" 
                            stroke="#38bdf8" 
                            strokeWidth="1.2" 
                            strokeLinecap="round" 
                        />
                        {/* Micro Corner Dot */}
                        <circle cx="2" cy="2" r="0.6" fill="#38bdf8" opacity="0.6" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#medicalCrossGrid)" />
            </svg>

            {/* 4. Live ECG / Heartbeat Telemetry Vital Wave (ICU Monitor Wave 1) */}
            <div className="absolute top-[22%] left-0 w-full opacity-60">
                <svg 
                    className="w-full h-24 block overflow-visible" 
                    viewBox="0 0 1200 100" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="ecgLaserGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.05" />
                            <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.95" />
                            <stop offset="90%" stopColor="#ffffff" stopOpacity="1" />
                            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>

                    {/* Faint Baseline Monitor Track */}
                    <path 
                        d={fullEcgPath} 
                        stroke="#0284c7" 
                        strokeWidth="1.2" 
                        opacity="0.18" 
                        fill="none" 
                    />

                    {/* Ambient Pulse Glow */}
                    <path 
                        d={fullEcgPath} 
                        stroke="#00f0ff" 
                        strokeWidth="4" 
                        opacity="0.15" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        fill="none" 
                    />

                    {/* Active Traveling Cardiac Pulse */}
                    <path 
                        ref={ecgBeam1Ref}
                        d={fullEcgPath} 
                        stroke="url(#ecgLaserGrad1)" 
                        strokeWidth="2.4" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeDasharray="160 1040"
                        fill="none" 
                    />
                </svg>
            </div>

            {/* 5. Second ECG Wave lower in the page */}
            <div className="absolute top-[68%] left-0 w-full opacity-40">
                <svg 
                    className="w-full h-24 block overflow-visible" 
                    viewBox="0 0 1200 100" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    {/* Faint Baseline */}
                    <path 
                        d={fullEcgPath} 
                        stroke="#0284c7" 
                        strokeWidth="1" 
                        opacity="0.15" 
                        fill="none" 
                    />

                    {/* Active Traveling Cardiac Pulse */}
                    <path 
                        ref={ecgBeam2Ref}
                        d={fullEcgPath} 
                        stroke="#00f0ff" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeDasharray="140 1060"
                        opacity="0.8"
                        fill="none" 
                    />
                </svg>
            </div>
        </div>
    );
}

export default MedicalTelemetryBackground;
