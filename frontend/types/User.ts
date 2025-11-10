export interface User { 
  id: string | null;
  email: string | null;
  name: string | null;
  photo: string | null;
  salt: string | null;
  iv: string | null;
  encryptedVaultKey: string | null;
}