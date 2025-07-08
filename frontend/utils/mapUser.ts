// utils/mapUser.ts
import { User } from "@/types/User";

export const mapUser = (user: User) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  photo: user.photo
});
