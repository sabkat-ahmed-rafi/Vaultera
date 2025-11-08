import HeroSection from "@/components/HeroSection/HeroSection";
import Navbar from "@/components/Navbar/Navbar";
import UserLoadingWrapper from "@/components/others/UserLoadingWrapper";
import FeaturesSection from "@/components/Sections/FeaturesSection";
import SecuritySection from "@/components/Sections/SecuritySection";
import HowItWorksSection from "@/components/Sections/HowItWorksSection";
import CTASection from "@/components/Sections/CTASection";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <UserLoadingWrapper>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="flex-grow">
          <HeroSection />
          <FeaturesSection />
          <SecuritySection />
          <HowItWorksSection />
          <CTASection />
        </main>

        <Footer />
      </div>
    </UserLoadingWrapper>
  );
}
