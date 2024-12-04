import crypto from "crypto";

export function generateOTP(length: number = 6): string {
  return crypto.randomInt(0, Math.pow(10, length)).toString().padStart(length, "0");
}
