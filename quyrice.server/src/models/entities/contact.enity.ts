import mongoose from 'mongoose'
import { IContact } from 'models/types/contact/contact.type'

const contactSchema = new mongoose.Schema<IContact>(
  {
    configId: {
      type: String,
      select: false,
      default: 'singleton',
      unique: true
    },
    facebook: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    zalo: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Contact = mongoose.model<IContact>('Contact', contactSchema, 'contacts')

export default Contact
