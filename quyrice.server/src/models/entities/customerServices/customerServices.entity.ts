import mongoose, { Schema } from 'mongoose'
import { ICustomerService, ICustomerServiceItem } from 'models/types/customerServices/customerServices.type'

const customerServiceItemSchema = new Schema<ICustomerServiceItem>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true }
  },
  {
    _id: false
  }
)

const customerServiceSchema = new Schema<ICustomerService>(
  {
    configId: {
      type: String,
      default: 'singleton',
      unique: true,
      select: false
    },
    customerServices: [customerServiceItemSchema]
  },
  { timestamps: true }
)

const CustomerService = mongoose.model<ICustomerService>('CustomerService', customerServiceSchema, 'customerServices')

export default CustomerService
