import { Router } from 'express'
import authRoute from './auth.router'
import contactRoute from './contact.router'
import customerServiceRoute from './customerService.router'
import adminRoute from './admin/index.router'
import { adminAuthMiddleware } from '../middleware/admin-auth.middware'

const mainRouter = Router()

mainRouter.use('/auth', authRoute)
mainRouter.use('/contact', contactRoute)
mainRouter.use('/customer-service', customerServiceRoute)

mainRouter.use('/admin', adminAuthMiddleware, adminRoute)

export default mainRouter
