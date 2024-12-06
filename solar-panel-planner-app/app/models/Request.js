import mongoose from "mongoose";
const { Schema } = mongoose;

const RequestSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    requestedDate: { type: Date, required: true, unique: true },
    status: {
      type: String,
      enum: ["new", "scheduled", "cancelled", "visited"],
      default: "new",
    },
    scheduledDate: { type: Date, required: true, unique: true },
    confirmationEmailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Request ||
  mongoose.model("Request", RequestSchema, "requests");
