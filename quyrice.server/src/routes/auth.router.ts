import express from 'express'
import { Request, Response } from 'express'
import { login, register } from '../modules/auth/authController'
import { checkExistingUser } from '../middleware/check-existing-user.middleware'
const route = express.Router()

route.post('/login', login)

route.post('/register', checkExistingUser, register)

export default route
