import HeroSection from "@/components/landing/hero-section";
import Showcase from "@/components/landing/showcase";
import Features from "@/components/landing/features";
import Pricing from "@/components/landing/pricing";
import Testimonial from "@/components/landing/testimonial";
import FAQ from "@/components/landing/faq";
import CTA from "@/components/landing/cta";
export default async function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <Showcase />
      <Features />
      <Pricing />
      <Testimonial />
      <FAQ />
      <CTA />
    </div>
  );
}
