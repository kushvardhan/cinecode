import { Schema, model, models } from 'mongoose'

const ContactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    service: { type: String },
    message: { type: String, required: true },
    ip: { type: String },
  },
  { timestamps: true }
)

export const Contact = models.Contact || model('Contact', ContactSchema)
