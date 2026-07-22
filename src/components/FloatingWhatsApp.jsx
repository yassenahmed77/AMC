import { MessageCircle } from 'lucide-react';

function FloatingWhatsApp() {
    const whatsappClean = "201005183039";
    const defaultMessage = encodeURIComponent("Hello AMC Medical Store! I have an inquiry about your medical equipment.");

    return (
        <a
            href={`https://wa.me/${whatsappClean}?text=${defaultMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-xl shadow-emerald-500/25 border-2 border-white flex items-center gap-2.5 transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer"
            title="Chat with AMC Support on WhatsApp"
            aria-label="WhatsApp Support"
        >
            <MessageCircle className="w-6 h-6 shrink-0 group-hover:rotate-12 transition-transform duration-300" />
            <span className="hidden sm:inline-block text-xs font-black uppercase tracking-wider pr-1">
                Chat with Us
            </span>
        </a>
    );
}

export default FloatingWhatsApp;
