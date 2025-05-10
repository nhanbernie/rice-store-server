import { Router } from 'express';
import { getCustomerService } from '../modules/user/customerServices/customerServicesController';

const route = Router();

route.get('/', getCustomerService)

export default route;
