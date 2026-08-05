import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Benefits from '../components/landing/Benefits';
import Testimonials from '../components/landing/Testimonials';
import CTA from '../components/landing/CTA';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-base-light dark:bg-base-dark overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
