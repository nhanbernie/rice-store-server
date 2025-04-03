import mongoose from 'mongoose'
import { IUser } from 'models/types/common.type'

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      },
      expiresIn: {
        type: Number,
        required: true
      }
    }
  ]
})

const User = mongoose.model<IUser>('User', userSchema, 'users')

export default User
