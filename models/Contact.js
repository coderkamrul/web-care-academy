import mongoose from "mongoose"

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    howDidYouHearAboutUs: { type: String },
    message: { type: String, required: true }
  },
  { timestamps: true }
)

export const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema)
