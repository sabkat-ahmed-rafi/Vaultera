import { ReactNode } from 'react';
import Sidebar from '@/components/Vault/Sidebar/Sidebar';
import MasterPasswordGuard from "@/components/others/MasterPasswordGuard";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute"

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black/50 flex">
     <ProtectedRoute>
      <MasterPasswordGuard>
        <Sidebar />
        <main className="flex-1 min-h-screen overflow-auto">
           {children}
        </main>
      </MasterPasswordGuard>
     </ProtectedRoute>
    </div>
  );
}