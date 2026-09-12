import Landing from '../components/Header/Landing';
import CorkboardTrust from '../components/CorkboardTrust';
import FeaturedProducts from '../components/FeaturedProducts';
import ReviewsSwiper from '../components/ReviewsSwiper';
import AboutPreview from '../components/AboutPreview';
import CTASection from '../components/CTASection';

function Home() {
    return (
        <>
            <Landing />
            <CorkboardTrust />
            <FeaturedProducts />
            <ReviewsSwiper />
            <AboutPreview />
            <CTASection />
        </>
    );
}

export default Home;
