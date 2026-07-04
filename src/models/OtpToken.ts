import mongoose, { Schema, models, model } from "mongoose";

export interface IOtpToken extends mongoose.Document {
  phone: string;
  code: string;
  expiresAt: Date;
  consumed: boolean;
}

const OtpTokenSchema = new Schema<IOtpToken>({
  phone: { type: String, required: true, index: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  consumed: { type: Boolean, default: false },
});

// Auto-delete expired OTPs so the collection stays small.
OtpTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default models.OtpToken || model<IOtpToken>("OtpToken", OtpTokenSchema);
