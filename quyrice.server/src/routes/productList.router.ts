import { Router } from 'express'
import { getProductList } from '@modules/user/productList/productListController'
const route = Router()

route.get('/', getProductList)

export default route
