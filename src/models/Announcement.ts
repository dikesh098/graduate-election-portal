import mongoose, { Schema, models, model } from "mongoose";

export interface IAnnouncement extends mongoose.Document {
  title: string;
  body: string;
  category: "news" | "deadline" | "event" | "general";
  publishedAt: Date;
  createdBy: string;
}

const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    category: { type: String, enum: ["news", "deadline", "event", "general"], default: "general" },
    publishedAt: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Announcement || model<IAnnouncement>("Announcement", AnnouncementSchema);
