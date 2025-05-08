import { Router } from 'express'
import getContact from '../modules/user/contact/contactController'
const route = Router()

route.get('/', getContact)

export default route
