import { Router } from 'express'
import { updateContact } from '@modules/admin/contact/adminContractController'
import { validateContactData } from '@middlewares/contact-validatation.middware'

const router = Router()
router.put('/contact', validateContactData, updateContact)

export default router
