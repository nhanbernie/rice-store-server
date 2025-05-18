import { Request, Response, NextFunction } from 'express'
import { IContactItem } from '../models/types/contact/contact.type'
import { CustomError } from '../utils/errors/custom-error'
import { sendResponse } from '../utils/responses/response-helper'

export const validateContactData = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { contacts } = req.body

    if (!Array.isArray(contacts)) {
      throw new CustomError('Contacts must be an array', 400)
    }

    if (contacts.length === 0) {
      throw new CustomError('At least one contact must be provided', 400)
    }

    contacts.forEach((contact: IContactItem) => {
      if (!contact.type || !contact.link) {
        throw new CustomError('Each contact must have type and link', 400)
      }

      // Validate based on contact type
      switch (contact.type) {
        case 'phone':
          if (!/^\+?[0-9]{10,}$/.test(contact.link)) {
            throw new CustomError(`Invalid phone number format: ${contact.link}`, 400)
          }
          break

        case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.link)) {
            throw new CustomError(`Invalid email format: ${contact.link}`, 400)
          }
          break

        case 'facebook':
        case 'tiktok':
        case 'zalo':
          if (!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(contact.link)) {
            throw new CustomError(`Invalid URL format for ${contact.type}: ${contact.link}`, 400)
          }
          break
      }
    })

    next()
  } catch (error) {
    if (error instanceof CustomError) {
      sendResponse(res, error.statusCode, false, error.message)
    } else {
      sendResponse(res, 500, false, 'Validation error occurred')
    }
  }
}
