import mongoose, { Schema, models, model } from "mongoose";

export interface IAdminUser extends mongoose.Document {
  email: string;
  passwordHash: string;
  name: string;
  role: "super_admin" | "staff";
  createdAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["super_admin", "staff"], default: "staff" },
  },
  { timestamps: true }
);

export default models.AdminUser || model<IAdminUser>("AdminUser", AdminUserSchema);
