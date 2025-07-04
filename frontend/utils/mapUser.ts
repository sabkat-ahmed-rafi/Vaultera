// utils/mapUser.ts
import { User } from "firebase/auth";
import { AuthUserData } from "@/types/User";

export const mapFirebaseUser = (user: User): AuthUserData => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
});
