export function generateOTPEmail(otp: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="text-align: center; color: #333;">Verification Code from Libr...</h1>
      <p style="font-size: 18px; text-align: center; color: #666;">Your One Time Password is:</p>
      <h2 style="text-align: center; background-color: #f0f0f0; border-radius: 5px; color: #333; padding: 10px; font-size: 24px;">
        ${otp}
      </h2>
      <p style="text-align: center; color: #888; font-size: 14px;">This code will expire in 10 minutes.</p>
    </div>
  `;
}

