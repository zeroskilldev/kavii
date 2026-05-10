export const otpVerifyTemplate = (otp: string) => {
  return ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 12px;">


      <h1 style="color: #111;">Kavii Email Verification</h1>

      <p style="font-size: 16px;">
        Your verification OTP is:
      </p>

      <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 24px 0; color: #000;">

        ${otp}

      </div>

      <p style="font-size: 14px; color: #666;">
        This OTP will expire in 10 minutes.
      </p>
    </div>
  `;
};