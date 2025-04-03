import { sendResponse } from '../utils/responses/response-helper'
import User from '../models/entities/userEntity'
import { Request, Response, NextFunction } from 'express'

export const checkExistingUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      sendResponse(res, 400, false, 'Email already exists')
      return
    }
    next()
  } catch (error) {
    sendResponse(res, 500, false, 'Server error while checking user')
  }
}
