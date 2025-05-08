import mongoose from 'mongoose'
import { IUser } from 'models/types/common.type'
import { UserRole } from '../../enums/common.enum'

const userSchema = new mongoose.Schema<IUser>(
  {
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
    role: {
      type: String,
      enum: [UserRole.USER, UserRole.ADMIN],
      default: UserRole.USER
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
  },
  {
    timestamps: true
  }
)

const User = mongoose.model<IUser>('User', userSchema, 'users')

export default User
