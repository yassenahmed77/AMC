import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import Header from "./components/Header/Header";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import GlobalAnimatedBackground from "./components/GlobalAnimatedBackground";
import { Toaster } from 'react-hot-toast';
import { RefreshCw } from 'lucide-react';

// Route-level Code Splitting (Lazy Loading) for ultra-fast initial page loads
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/products/Products"));
const ProductsDetails = lazy(() => import("./pages/products/ProductsDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Contact = lazy(() => import("./pages/Contact"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Suspense Fallback Loader
function PageFallbackLoader() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-transparent py-20">
            <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
            <p className="text-cyan-200/80 font-bold text-xs uppercase tracking-widest animate-pulse">
                Loading AMC Experience...
            </p>
        </div>
    );
}

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <ErrorBoundary>
      <main className="bg-[#020712] text-slate-100 min-h-screen flex flex-col justify-between relative overflow-x-hidden">
          {/* Living GSAP Light Arcs, Traveling Beams & Particle Wave Background across the Whole Website */}
          <GlobalAnimatedBackground />

          <div className="relative z-10 flex-grow">
              <ScrollToTop />
              <Header/>
              <Toaster position="bottom-right" />
              <div className={isHome ? '' : 'pt-24 lg:pt-28'}>
                  <Suspense fallback={<PageFallbackLoader />}>
                      <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/products/:id" element={<ProductsDetails />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/checkout" element={<Checkout />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/admin" element={<AdminDashboard />} />
                          <Route path="*" element={<NotFound />} />
                      </Routes>
                  </Suspense>
              </div>
          </div>
          <FloatingWhatsApp />
          <Footer />
      </main>
    </ErrorBoundary>
  )
}

export default App;
