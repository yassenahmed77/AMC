import { useState } from 'react';
import { ZoomIn, X } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

// 3D Push Pin Component
function PushPin({ color = 'red', className = 'left-1/2 -translate-x-1/2' }) {
    const colors = {
        red: { fill: '#ef4444', border: '#b91c1c', top: '#fca5a5' },
        blue: { fill: '#3b82f6', border: '#1d4ed8', top: '#93c5fd' },
        yellow: { fill: '#eab308', border: '#a16207', top: '#fef08a' },
        green: { fill: '#10b981', border: '#047857', top: '#6ee7b7' },
        gold: { fill: '#d97706', border: '#78350f', top: '#fde68a' }
    };

    const c = colors[color] || colors.red;

    return (
        <div className={`absolute -top-4 z-30 pointer-events-none pin-shadow ${className}`}>
            <svg width="32" height="38" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Needle */}
                <path d="M16 26L16 37" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
                
                {/* Pin Head */}
                <circle cx="16" cy="16" r="12" fill={c.border} />
                <circle cx="16" cy="15" r="11" fill={c.fill} />
                <circle cx="13" cy="12" r="4.5" fill={c.top} opacity="0.7" />
                <circle cx="12" cy="11" r="2" fill="#ffffff" opacity="0.9" />
                <circle cx="16" cy="15" r="7" stroke={c.border} strokeWidth="1" fill="none" opacity="0.4" />
            </svg>
        </div>
    );
}

// Scotch Tape Accent
function ScotchTape({ className = '' }) {
    return (
        <div className={`absolute h-6 w-16 tape-overlay z-20 opacity-80 pointer-events-none ${className}`} />
    );
}

const partnersGallery = [
    {
        id: 1,
        src: '/images/partners/mindray-partner-3.jpg',
        title: '🌎تكريم دولي',
        pinColor: 'red',
        pinPos: 'left-1/2 -translate-x-1/2',
        rotation: '-rotate-3 sm:-rotate-5',
        offsetY: 'sm:-translate-y-3 lg:-translate-y-5',
        tapePos: '-top-3 left-4 rotate-[-15deg]'
    },
    {
        id: 2,
        src: '/images/partners/mindray-partner-1.jpg',
        title: '🩺احدث الاجهزة',
        pinColor: 'blue',
        pinPos: 'right-7',
        rotation: 'rotate-4 sm:rotate-6',
        offsetY: 'sm:translate-y-5 lg:translate-y-7',
        tapePos: '-top-3 right-4 rotate-[12deg]'
    },
    {
        id: 3,
        src: '/images/partners/mindray-partner-2.jpg',
        title: '🏥تسليم جهاز',
        pinColor: 'gold',
        pinPos: 'left-8',
        rotation: '-rotate-2 sm:-rotate-4',
        offsetY: 'sm:-translate-y-2 lg:-translate-y-4',
        tapePos: '-top-3 left-3 rotate-[-8deg]'
    },
    {
        id: 4,
        src: '/images/partners/mindray-partner-4.jpg',
        title: '🌍تكريم دولي',
        pinColor: 'green',
        pinPos: 'left-1/2 -translate-x-1/2',
        rotation: 'rotate-3 sm:rotate-5',
        offsetY: 'sm:translate-y-4 lg:translate-y-6',
        tapePos: '-top-3 right-4 rotate-[15deg]'
    },
    {
        id: 5,
        src: '/images/partners/mindray-partner-5.jpg',
        title: '🌍ملتقي دولي',
        pinColor: 'red',
        pinPos: 'right-6',
        rotation: '-rotate-4 sm:-rotate-6',
        offsetY: 'sm:-translate-y-4 lg:-translate-y-6',
        tapePos: '-top-3 left-4 rotate-[-12deg]'
    },
    {
        id: 6,
        src: '/images/partners/clinic-partner-1.jpg',
        title: '🏥تجهيز حضانات وسونار',
        pinColor: 'gold',
        pinPos: 'left-7',
        rotation: 'rotate-2 sm:rotate-4',
        offsetY: 'sm:translate-y-3 lg:translate-y-5',
        tapePos: '-top-3 right-3 rotate-[10deg]'
    },
    {
        id: 7,
        src: '/images/partners/clinic-partner-2.jpg',
        title: '🩺سونار 4D وطابعة',
        pinColor: 'blue',
        pinPos: 'left-1/2 -translate-x-1/2',
        rotation: '-rotate-3 sm:-rotate-5',
        offsetY: 'sm:-translate-y-3 lg:-translate-y-4',
        tapePos: '-top-3 left-4 rotate-[-14deg]'
    },
    {
        id: 8,
        src: '/images/partners/clinic-partner-3.jpg',
        title: '🏥تسليم وتشغيل عيادة',
        pinColor: 'red',
        pinPos: 'right-8',
        rotation: 'rotate-4 sm:rotate-6',
        offsetY: 'sm:translate-y-6 lg:translate-y-8',
        tapePos: '-top-3 right-4 rotate-[18deg]'
    },
    {
        id: 9,
        src: '/images/partners/clinic-partner-4.jpg',
        title: '🩺سونار فيليبس التخصصي',
        pinColor: 'green',
        pinPos: 'left-6',
        rotation: '-rotate-2 sm:-rotate-4',
        offsetY: 'sm:-translate-y-2 lg:-translate-y-5',
        tapePos: '-top-3 left-3 rotate-[-6deg]'
    },
    {
        id: 10,
        src: '/images/partners/clinic-partner-5.jpg',
        title: '🤝فريق العمل والأطباء',
        pinColor: 'blue',
        pinPos: 'left-1/2 -translate-x-1/2',
        rotation: 'rotate-3 sm:rotate-5',
        offsetY: 'sm:translate-y-4 lg:translate-y-6',
        tapePos: '-top-3 right-4 rotate-[14deg]'
    }
];

function CorkboardTrust() {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    return (
        <section className="py-12 sm:py-20 bg-transparent border-y border-cyan-500/10 overflow-hidden relative font-sans select-none">
            <div className="container relative z-10 px-4 sm:px-6">
                
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
                    <p className="text-cyan-400 text-xs sm:text-sm font-black uppercase tracking-widest mb-2">
                        — OUR PARTNERS —
                    </p>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                        شركاء <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">النجاح</span> 📌
                    </h2>
                    
                    <p className="text-slate-300 text-xs sm:text-base mt-2 font-semibold max-w-2xl mx-auto leading-relaxed">
                        محطات وتكريمات دولية وتجهيزات ميدانية لأحدث الأجهزة الطبية بمصر والشرق الأوسط.
                    </p>
                </div>

                {/* Main Corkboard Wall Container - Organic "Messy" Pinned Layout */}
                <div className="relative max-w-6xl mx-auto rounded-3xl wood-frame corkboard-bg p-5 sm:p-10 md:p-12">
                    
                    {/* Hanging Metal Rings Decor (Top Corners) */}
                    <div className="absolute -top-6 left-12 w-6 h-10 border-4 border-slate-700 bg-slate-800 rounded-t-full shadow-inner hidden sm:block" />
                    <div className="absolute -top-6 right-12 w-6 h-10 border-4 border-slate-700 bg-slate-800 rounded-t-full shadow-inner hidden sm:block" />

                    {/* Organically Scattered Photos */}
                    <div className="flex flex-wrap justify-center gap-6 sm:gap-7 lg:gap-8 items-center relative z-10 py-4 sm:py-6">
                        {partnersGallery.map((photo, index) => (
                            <div 
                                key={photo.id}
                                className={`w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)] max-w-[285px] sm:max-w-[305px] transition-transform duration-300 ${photo.offsetY || ''}`}
                            >
                                <ScrollReveal variant="fade-up" delay={`delay-${((index % 4) + 1) * 100}`}>
                                    <div 
                                        onClick={() => setSelectedPhoto(photo)}
                                        className={`bg-white/95 p-1.5 sm:p-2 pb-2.5 sm:pb-3 rounded-xl sm:rounded-2xl shadow-xl polaroid-card border border-slate-200/90 group cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-0 hover:z-40 hover:shadow-2xl relative ${photo.rotation}`}
                                    >
                                        <PushPin color={photo.pinColor} className={photo.pinPos} />
                                        <ScotchTape className={photo.tapePos} />
                                        
                                        {/* Image Container - Maximized width */}
                                        <div className="relative overflow-hidden rounded-lg bg-slate-900 aspect-[4/3] flex items-center justify-center w-full">
                                            <img 
                                                src={photo.src} 
                                                alt={photo.title} 
                                                className={`w-full h-full object-cover ${photo.id === 2 ? 'object-[center_15%]' : photo.id === 3 ? 'object-[center_35%]' : 'object-center'} group-hover:scale-105 transition-transform duration-300 block`} 
                                                loading="lazy" 
                                            />
                                            <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="w-10 h-10 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg">
                                                    <ZoomIn size={20} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Photo Caption */}
                                        <div className="mt-1.5 sm:mt-2 text-center">
                                            <h4 className="font-black text-slate-900 text-xs sm:text-sm leading-tight">
                                                {photo.title}
                                            </h4>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>
                        ))}
                    </div>

                </div>

            </div>

            {/* Photo Lightbox Modal */}
            {selectedPhoto && (
                <div 
                    className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-3xl p-4 overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        <button 
                            onClick={() => setSelectedPhoto(null)}
                            className="absolute top-4 right-4 z-10 bg-slate-800/90 hover:bg-slate-700 text-white p-2 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <img 
                            src={selectedPhoto.src} 
                            alt={selectedPhoto.title} 
                            className="w-full h-auto max-h-[80vh] object-contain rounded-2xl mx-auto block" 
                        />
                        <div className="mt-3 text-center">
                            <h3 className="text-white font-black text-base sm:text-lg">{selectedPhoto.title}</h3>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default CorkboardTrust;
