import ProductList from '@models/entities/productList/productList.entity'
import { sendResponse } from '@utils/responses/response-helper'
import { Request, Response, NextFunction } from 'express'
export const getProductList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const producList = await ProductList.findOne({}).select('-_id -__v')
    if (!producList) {
      sendResponse(res, 404, false, 'Product list not found')
    }
    sendResponse(res, 200, true, 'Product list retrieved successfully', producList)
  } catch (error) {
    next(error)
  }
}
