import mongoose, { Schema, models, model } from "mongoose";

export type RegistrationStatus =
  | "submitted"
  | "under_review"
  | "documents_pending"
  | "verified"
  | "rejected";

export interface IRegistration extends mongoose.Document {
  fullName: string;
  email: string;
  phone: string;
  graduationYear: number;
  university: string;
  district: string;
  constituency: string;
  address: string;
  documents: { label: string; url: string; publicId: string }[];
  status: RegistrationStatus;
  statusHistory: { status: RegistrationStatus; note?: string; at: Date }[];
  trackingId: string;
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    graduationYear: { type: Number, required: true },
    university: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    constituency: { type: String, default: "Nagpur Graduates' Constituency" },
    address: { type: String, required: true },
    documents: [
      {
        label: String,
        url: String,
        publicId: String,
      },
    ],
    status: {
      type: String,
      enum: ["submitted", "under_review", "documents_pending", "verified", "rejected"],
      default: "submitted",
    },
    statusHistory: [
      {
        status: { type: String },
        note: String,
        at: { type: Date, default: Date.now },
      },
    ],
    trackingId: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true }
);

export default models.Registration || model<IRegistration>("Registration", RegistrationSchema);
