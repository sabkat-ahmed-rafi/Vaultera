import Navbar from "@/components/Navbar/Navbar";
import MasterPasswordGuard from "@/components/others/MasterPasswordGuard";

export default function Home() {
  return (
    <MasterPasswordGuard>
     <div>
       <Navbar />
     </div>
    </MasterPasswordGuard>
  );
}
