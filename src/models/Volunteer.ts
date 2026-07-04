import mongoose, { Schema, models, model } from "mongoose";

export interface IVolunteer extends mongoose.Document {
  fullName: string;
  email: string;
  phone: string;
  district: string;
  availability: string;
  message?: string;
  status: "pending" | "approved" | "declined";
  createdAt: Date;
}

const VolunteerSchema = new Schema<IVolunteer>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    district: { type: String, required: true },
    availability: { type: String, required: true },
    message: String,
    status: { type: String, enum: ["pending", "approved", "declined"], default: "pending" },
  },
  { timestamps: true }
);

export default models.Volunteer || model<IVolunteer>("Volunteer", VolunteerSchema);
