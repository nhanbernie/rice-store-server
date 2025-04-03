import express from 'express'
import { Request, Response } from 'express'
import { login, register } from '../modules/auth/authController'
const route = express.Router()

route.post('/login', login)

route.post('/register', register)

export default route
