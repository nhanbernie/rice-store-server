import { Request, Response, NextFunction } from 'express'
import { updateContactInfo } from './adminContactService'
import { IContact } from '../../../models/types/contact/contact.type'
import { sendResponse } from '../../../utils/responses/response-helper'
import { CustomError } from '../../../utils/errors/custom-error'

export const updateContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const contactData: IContact = {
      configId: 'singleton',
      contacts: req.body.contacts
    }

    const updatedContact = await updateContactInfo(contactData)
    sendResponse(res, 200, true, 'Contact information updated successfully', updatedContact)
  } catch (error) {
    if (error instanceof CustomError) {
      sendResponse(res, error.statusCode, false, error.message)
    } else {
      sendResponse(res, 500, false, 'Failed to update contact information')
    }
  }
}
