import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({ 
  children, 
  className = "", 
  variant = "fade-up", 
  duration = "duration-700", 
  delay = 0, 
  threshold = 0.15, 
  once = true,
  style = {}
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    // Tracking if element showed up in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );
    
    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [once, threshold]);

  const variantStyles = {
    "fade-up": "opacity-0 translate-y-8",
    "fade-down": "opacity-0 -translate-y-8",
    "fade-left": "opacity-0 translate-x-8",
    "fade-right": "opacity-0 -translate-x-8",
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

  // Convert numeric delay to ms style or keep string class
  const delayStyle = typeof delay === 'number' ? { transitionDelay: `${delay}ms` } : {};
  const delayClass = typeof delay === 'string' ? delay : '';

  return (
    <div
      ref={domRef}
      style={{ ...delayStyle, ...style }}
      className={`transition-all ${duration} ${delayClass} ease-out transform-gpu will-change-transform ${
        isVisible ? activeStyles[variant] : variantStyles[variant]
      } ${className}`}
    >
      {children}
    </div>
  );
}
