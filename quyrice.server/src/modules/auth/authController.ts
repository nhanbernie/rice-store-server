import { Request, Response, NextFunction } from 'express'
import { sendResponse } from '../../utils/responses/response-helper'
import User from '../../models/entities/userEntity'

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body

  if (!email || !password) {
    sendResponse(res, 400, false, 'Email and password are required')
    return
  }
  try {
    const user = await User.findOne({ email })
    if (!user) {
      sendResponse(res, 401, false, 'Invalid email or password')
      return
    }
    return sendResponse(res, 200, true, 'Login successful', {
      user: {
        email: user.email
      }
    })
  } catch (error) {
    next(error)
  }
}

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    sendResponse(res, 400, false, 'Name, email and password are required')
    return
  }

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      sendResponse(res, 409, false, 'Email already exists')
      return
    }

    const user = new User({ name, email, password })
    await user.save()
    return sendResponse(res, 201, true, 'User registered successfully', {
      user: {
        email: user.email
      }
    })
  } catch (error) {
    next(error)
  }
}
