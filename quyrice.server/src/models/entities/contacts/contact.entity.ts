import mongoose from 'mongoose'
import { IContactItem, IContact } from 'models/types/contact/contact.type'

const contactItemSchema = new mongoose.Schema<IContactItem>(
  {
    type: { type: String, required: true },
    link: { type: String, required: true }
  },
  { _id: false }
)

const contactSchema = new mongoose.Schema<IContact>(
  {
    configId: {
      type: String,
      default: 'singleton',
      unique: true,
      select: false
    },
    contacts: [contactItemSchema]
  },
  { timestamps: true }
)

const Contact = mongoose.model<IContact>('Contact', contactSchema, 'contacts')

export default Contact
