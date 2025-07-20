import Navbar from "@/components/Navbar/Navbar";
import AuthLayer from "@/components/others/AuthLayer";

export default function Home() {
  return (
    <AuthLayer>
     <div>
       <Navbar />
     </div>
    </AuthLayer>
  );
}
