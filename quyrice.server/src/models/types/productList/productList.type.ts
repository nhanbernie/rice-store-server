import { Document } from 'mongoose'
import { Stock, Badges, SortBy } from '@enums/common.enum'
export interface IProductListItem {
  productId: string
  name: string
  slug: string
  thumbnail: {
    url: string
    alt: string
  }
  price: number
  discountPercentage: number
  category: string
  badges: Badges // "New", "Sale", "Best Seller"
  stockStatus: Stock
}

export interface IProductList extends Document {
  categoryId: string
  categoryName: string
  categorySlug: string
  products: IProductListItem[]
  filters: {
    priceRange: {
      min: number
      max: number
    }
    categories: string[]
    available: boolean
  }
  pagination: {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
  }
  sortBy: SortBy
  metadata: {
    title: string
    description: string
    keywords: string[]
  }
  lastUpdated: Date
}
