import { useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const MasterPasswordGuard = ( { children }: Readonly<{ children: React.ReactNode }> ) => {

  const { decryptedVaultKey } = useAppSelector(state => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!decryptedVaultKey) {
      const currentPath = window.location.pathname;
      router.replace(`/auth/unlock?redirect=${encodeURIComponent(currentPath)}`);
    };
  }, [decryptedVaultKey, router]);

  if (!decryptedVaultKey) return null; // Prevent flashing unprotected UI
  if(decryptedVaultKey) return <>{ children }</>
}

export default MasterPasswordGuard