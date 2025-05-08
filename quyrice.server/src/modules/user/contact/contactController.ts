import { Request, Response, NextFunction } from 'express'
import Contact from '../../../models/entities/contact.enity'
import { sendResponse } from '../../../utils/responses/response-helper'

const getContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const contact = await Contact.findOne({}, { _id: 0 })
    if (!contact) {
      sendResponse(res, 404, false, 'Contact information not found')
    }
    sendResponse(res, 200, true, 'Contact information retrieved successfully', contact)
  } catch (error) {
    next(error)
  }
}

export default getContact
