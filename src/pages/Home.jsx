import Landing from '../components/Header/Landing';
import TrustFeatures from '../components/TrustFeatures';
import FeaturedProducts from '../components/FeaturedProducts';
import AboutPreview from '../components/AboutPreview';
import CTASection from '../components/CTASection';
import ScrollReveal from '../components/ScrollReveal';

function Home() {
    return (
        <>
            <Landing />
            
            <ScrollReveal variant="fade-up" id="reveal_trust">
                <TrustFeatures />
            </ScrollReveal>

            <ScrollReveal variant="fade-up" id="reveal_featured">
                <FeaturedProducts />
            </ScrollReveal>

            <ScrollReveal variant="fade-up" id="reveal_about">
                <AboutPreview />
            </ScrollReveal>

            <ScrollReveal variant="fade-up" id="reveal_cta">
                <CTASection />
            </ScrollReveal>
        </>
    );
}

export default Home;
