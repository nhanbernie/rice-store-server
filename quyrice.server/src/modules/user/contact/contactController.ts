import { Request, Response, NextFunction } from 'express'
import Contact from '../../../models/entities/contacts/contact.entity'
import { sendResponse } from '../../../utils/responses/response-helper'

export const getContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const getContact = await Contact.findOne({}, { _id: 0 })
    if (!getContact) {
      sendResponse(res, 404, false, 'Contact information not found')
    }
    sendResponse(res, 200, true, 'Contact information retrieved successfully', getContact?.contacts)
  } catch (error) {
    next(error)
  }
}
