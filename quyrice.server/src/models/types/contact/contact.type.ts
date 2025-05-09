export interface IContactItem {
  type: 'facebook' | 'phone' | 'zalo' | 'email' | 'tiktok' | string
  link: string
}
export interface IContact {
  configId: string
  contacts: IContactItem[]
  createdAt?: Date
  updatedAt?: Date
}
