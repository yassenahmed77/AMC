import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';
import Header from "./components/Header/Header";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
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
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50/30 py-20">
            <RefreshCw className="w-10 h-10 text-maincolor animate-spin mb-4" />
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest animate-pulse">
                Loading AMC Experience...
            </p>
        </div>
    );
}

function App() {
  return (
    <ErrorBoundary>
      <main className="bg-slate-50/30 min-h-screen flex flex-col justify-between relative">
          <div>
              <ScrollToTop />
              <Header/>
              <Toaster position="bottom-right" />
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
          <FloatingWhatsApp />
          <Footer />
      </main>
    </ErrorBoundary>
  )
}

export default App;
