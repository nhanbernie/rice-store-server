export interface ICustomerServiceItem {
  title: string
  description: string
}
export interface ICustomerService {
  configId: string
  customerServices: ICustomerServiceItem[]
  createdAt?: Date
  updatedAt?: Date
}
