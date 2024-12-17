import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div className="mx-auto ">
      <HeroSection />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}
