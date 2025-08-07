import { totp } from "otplib";

totp.options = { step: 30 };

export const generateTOTP = (secret: string): { code: string; timeRemaining: number } => {
    const code = totp.generate(secret);
    const now = Math.floor(Date.now() / 1000);
    const timeRemaining = 30 - (now % 30);
    return { code, timeRemaining };
};