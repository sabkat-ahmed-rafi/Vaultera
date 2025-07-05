// utils/mapUser.ts
import { User as FirebaseUser } from "firebase/auth";
import { User } from "@/types/User";

export const mapFirebaseUser = (user: FirebaseUser): User => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
});
