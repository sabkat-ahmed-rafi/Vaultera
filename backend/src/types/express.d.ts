// src/types/express.d.ts
import { JwtUser } from "../types/types";

declare global {
  namespace Express {
    interface Request {
      user?: JwtUser;
    }
  }
}
