import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { validateUser } from '../../utils/validation/validateUser'
import { sendResponse } from '../../utils/responses/response-helper'
import { createUser } from '../../services/createUser'
import User from '../../models/entities/user.entity'

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

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      sendResponse(res, 401, false, 'Invalid email or password')
      return
    }
    const verrifytionToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: parseInt(process.env.JWT_EXPIRATION_TIME_HOUR as string, 10) || '1h'
    })

    return sendResponse(res, 200, true, 'Login successful', {
      user: {
        email: user.email,
        token: verrifytionToken
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

  const { error } = validateUser({ name, email, password })
  if (error) {
    sendResponse(res, 400, false, error.details[0].message)
    return
  }
  try {
    const user = await createUser(name, email, password)

    const verrifytionToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: parseInt(process.env.JWT_EXPIRATION_TIME_HOUR as string, 10) || '1h'
    })
    return sendResponse(res, 201, true, 'User registered successfully', {
      user: {
        email: user.email,
        token: verrifytionToken
      }
    })
  } catch (error) {
    next(error)
  }
}
