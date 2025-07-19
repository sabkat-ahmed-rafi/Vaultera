export interface User { 
  id: string | null;
  email: string | null;
  name: string | null;
  photo: string | null;
  salt: string | null;
  iv: string | null;
  encryptedVaultKey: string | null;
  paid: string | null;
  paymentType: string | null;
  paddleCustomerId: string | null;
  paddleSubscriptionId: string | null;
  subscriptionStatus: string | null;
  paymentExpiresAt: string | null;
}