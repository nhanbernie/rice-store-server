import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { validateUser } from '@utils/validation/validateUser'
import { sendResponse } from '@utils/responses/response-helper'
import { createUser } from '@services/createUser'
import User from '@models/entities/auth/user.entity'
import { ERROR, SUCCESS } from '@constants/messages/commonMessage.constant'

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const email = req.body.email
  const password = req.body.password
  
  if (!email || !password) {
    sendResponse(res, 400, false, ERROR.EMF020)
    return
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      sendResponse(res, 401, false, ERROR.EMF021)
      return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      sendResponse(res, 401, false, ERROR.EMF021)
      return
    }

    const accessToken = jwt.sign({ idUser: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: parseInt(process.env.JWT_EXPIRATION as string, 10)
    })

    return sendResponse(res, 200, true, SUCCESS.SUF001, {
      user: {
        email: user.email,
        role: user.role
      },
      token: accessToken
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

    const accessToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: parseInt(process.env.JWT_EXPIRATION as string, 10)
    })
    return sendResponse(res, 201, true, 'User registered successfully', {
      user: {
        email: user.email
      },
      token: accessToken
    })
  } catch (error) {
    next(error)
  }
}
