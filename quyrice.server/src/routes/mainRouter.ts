import { Router } from 'express'
import { adminAuthMiddleware } from '@middlewares/admin-auth.middware'
import { authRouter, contactRouter, customerServiceRouter, productListRouter, adminRouter } from '.'

const mainRouter = Router()

mainRouter.use('/auth', authRouter)
mainRouter.use('/contact', contactRouter)
mainRouter.use('/customer/service', customerServiceRouter)
mainRouter.use('/products', productListRouter)

mainRouter.use('/admin', adminAuthMiddleware, adminRouter)

export default mainRouter
