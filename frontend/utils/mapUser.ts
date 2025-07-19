// utils/mapUser.ts
import { User } from "@/types/User";

export const mapUser = (user: User) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  photo: user.photo,
  salt: user.salt,
  iv: user.iv,
  encryptedVaultKey: user.encryptedVaultKey,
  paid: user.paid,
  paymentType: user.paymentType,
  paddleCustomerId: user.paddleCustomerId,
  paddleSubscriptionId: user.paddleSubscriptionId,
  subscriptionStatus: user.subscriptionStatus,
  paymentExpiresAt: user.paymentExpiresAt
});
