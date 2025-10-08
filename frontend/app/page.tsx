import HeroSection from "@/components/HeroSection/HeroSection";
import Navbar from "@/components/Navbar/Navbar";
import UserLoadingWrapper from "@/components/others/UserLoadingWrapper";

export default function Home() {
  return (
   <UserLoadingWrapper>
     <div>
       <Navbar />
     </div>
     <div>
      <HeroSection />
     </div>
   </UserLoadingWrapper>
  );
}
