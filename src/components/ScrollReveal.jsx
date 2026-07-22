import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({ children, className = "", variant = "fade-up", duration = "duration-1000", delay = "", threshold = 0.1, once = true }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    // Tracking if element showed up
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If element showed up
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            // After first show up stop tracking
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );
    
    // Tracking current element
    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    // Stop tracking when in unmount phase
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [once, threshold]);

  const variantStyles = {
    "fade-up": "opacity-0 translate-y-10",
    "fade-down": "opacity-0 -translate-y-10",
    "fade-left": "opacity-0 translate-x-10",
    "fade-right": "opacity-0 -translate-x-10",
    "zoom-in": "opacity-0 scale-95",
    "fade": "opacity-0",
  };

  const activeStyles = {
    "fade-up": "opacity-100 translate-y-0",
    "fade-down": "opacity-100 translate-y-0",
    "fade-left": "opacity-100 translate-x-0",
    "fade-right": "opacity-100 translate-x-0",
    "zoom-in": "opacity-100 scale-100",
    "fade": "opacity-100",
  };

  return (
    <div
      ref={domRef}
      className={`transition-all ${duration} ${delay} ease-out transform-gpu will-change-transform ${
        isVisible ? activeStyles[variant] : variantStyles[variant]
      } ${className}`}
    >
      {children}
    </div>
  );
}
