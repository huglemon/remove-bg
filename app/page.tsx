import HeroSection from "@/components/landing/hero-section";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />

      {/* 后续部分会包含 Feature、Pricing、Testimonial、FAQ 等，但现在只关注 Hero 部分 */}
      <section className="py-20">{/* 这里将放置Features部分 */}</section>
    </div>
  );
}
