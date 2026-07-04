export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

/**
 * Sends an OTP SMS via MSG91. Swap this out for Twilio Verify, Firebase Auth,
 * or any other provider — this is the single place that talks to the SMS API.
 * In development (no MSG91_AUTH_KEY set), it just logs the OTP to the console
 * so you can test the full flow without a paid SMS account.
 */
export async function sendOtpSms(phone: string, otp: string) {
  const authKey = process.env.MSG91_AUTH_KEY;
  const templateId = process.env.MSG91_TEMPLATE_ID;

  if (!authKey || !templateId) {
    console.log(`[DEV OTP] Would send OTP ${otp} to ${phone}`);
    return { simulated: true };
  }

  const res = await fetch("https://control.msg91.com/api/v5/otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authkey: authKey,
    },
    body: JSON.stringify({
      template_id: templateId,
      mobile: phone,
      otp,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OTP provider error: ${text}`);
  }

  return res.json();
}
