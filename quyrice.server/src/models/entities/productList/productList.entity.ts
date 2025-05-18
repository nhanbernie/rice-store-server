import mongoose, { Schema } from 'mongoose'
import { IProductListItem, IProductList } from '@models/types/productList/productList.type'
import { Stock, Badges, SortBy } from '@enums/common.enum'

const productListItemSchema = new Schema<IProductListItem>({
  productId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    index: true
  },
  slug: {
    type: String,
    required: true,
    index: true
  },
  thumbnail: {
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  },
  price: {
    type: Number,
    required: true,
    index: true
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  badges: [
    {
      type: String,
      enum: [Badges.NEW, Badges.SALE, Badges.HOT, Badges.BEST_SELLER]
    }
  ],
  stockStatus: {
    type: String,
    enum: [Stock.IN_STOCK, Stock.OUT_OF_STOCK, Stock.LOW_STOCK, Stock.DISCONTINUED],
    default: Stock.IN_STOCK,
    index: true
  }
})

const productListSchema = new Schema<IProductList>(
  {
    categoryId: {
      type: String,
      required: true,
      index: true
    },
    categoryName: {
      type: String,
      required: true
    },
    categorySlug: {
      type: String,
      required: true,
      index: true
    },
    products: [productListItemSchema],
    filters: {
      priceRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
      },
      categories: [{ type: String }],
      available: { type: Boolean, default: true }
    },
    pagination: {
      currentPage: { type: Number, required: true, default: 1 },
      itemsPerPage: { type: Number, required: true, default: 12 },
      totalItems: { type: Number, required: true },
      totalPages: { type: Number, required: true }
    },
    sortBy: {
      type: String,
      enum: [SortBy.PRICE_ASC, SortBy.PRICE_DESC, SortBy.NAME_ASC, SortBy.NAME_DESC, SortBy.NEWEST],
      default: SortBy.NEWEST
    },
    metadata: {
      title: {
        type: String,
        required: true,
        maxlength: 60
      },
      description: {
        type: String,
        required: true,
        maxlength: 160
      },
      keywords: [{ type: String }]
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

productListSchema.index({ 'products.name': 'text' })
productListSchema.index({ categoryId: 1, 'products.price': 1 })
productListSchema.index({ 'products.category': 1, lastUpdated: -1 })

const ProductList = mongoose.model<IProductList>('ProductList', productListSchema, 'productLists')

export default ProductList
