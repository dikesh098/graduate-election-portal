import mongoose, { Schema, models, model } from "mongoose";

export interface IEvent extends mongoose.Document {
  title: string;
  description: string;
  location: string;
  startAt: Date;
  endAt?: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    startAt: { type: Date, required: true },
    endAt: Date,
  },
  { timestamps: true }
);

export default models.Event || model<IEvent>("Event", EventSchema);
