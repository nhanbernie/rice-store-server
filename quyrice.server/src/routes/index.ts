import { Router } from 'express'
import authRoute from './auth.router'
import contactRoute from './contact.router'
const mainRouter = Router()

mainRouter.use('/auth', authRoute)
mainRouter.use('/contact', contactRoute)

export default mainRouter
