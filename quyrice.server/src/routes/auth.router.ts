import { Router } from 'express'
import { login, register } from '../modules/auth/authController'
import { checkExistingUser } from '../middlewares/check-existing-user.middleware'

const route = Router()

route.post('/login', login)

route.post('/register', checkExistingUser, register)

export default route
