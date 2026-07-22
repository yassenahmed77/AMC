import { useEffect } from "react";
import { useLocation } from "react-router";

function ScrollToTop() {
    const { pathname } = useLocation();
    
    // Disable automatic browser scroll restoration on refresh
    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);

    useEffect(() => {
        // Scroll instantly to top on route change
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default ScrollToTop;
