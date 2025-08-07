export interface TwoFAAccount {
  id: string;
  title: string;
  issuer: string;
  accountName: string;
  secret: string;
  currentCode: string;
  timeRemaining: number;
  notes?: string;
  createdAt: string;
}