import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div className="mx-auto 2xl:max-w-[80%] 2xl:px-8">
      <HeroSection />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}
