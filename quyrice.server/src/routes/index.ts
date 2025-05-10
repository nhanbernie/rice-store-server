import { Router } from 'express'
import authRoute from './auth.router'
import contactRoute from './contact.router'
import customerServiceRoute from './customerService.router'
const mainRouter = Router()

mainRouter.use('/auth', authRoute)
mainRouter.use('/contact', contactRoute)
mainRouter.use('/customer-service', customerServiceRoute)
export default mainRouter
