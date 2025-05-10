import CustomerService from '../../../models/entities/customerServices/customerServices.entity'
import { Request, Response, NextFunction } from 'express'
import { sendResponse } from '../../../utils/responses/response-helper'

export const getCustomerService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const customerService = await CustomerService.findOne({}).select('-_id -__v')
    if (!customerService) {
      sendResponse(res, 404, true, 'Customer service not found')
    }
    sendResponse(res, 200, true, 'Customer service retrieved successfully', customerService?.customerServices)
  } catch (error) {
    next(error)
  }
}
