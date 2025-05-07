import { Router } from 'express'
import authRoute from './auth.router'

const mainRouter = Router()

mainRouter.use('/auth', authRoute)

export default mainRouter
