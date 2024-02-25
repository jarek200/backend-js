import { QueryString } from '../../types'

class APIFilter<T> {
  items: T[]
  protected queryStr: QueryString

  constructor(items: T[], queryStr: QueryString) {
    this.items = items
    this.queryStr = queryStr
  }

  dynamicSearch(): this {
    const searchQuery = this.queryStr.keyword?.toLowerCase()

    if (searchQuery) {
      this.items = this.items.filter(item => this.isMatch(item, searchQuery))
    }

    return this
  }

  protected isMatch(obj: any, query: string): boolean {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key]

        if (typeof value === 'string' && value.toLowerCase().includes(query)) {
          return true
        } else if (typeof value === 'object' && this.isMatch(value, query)) {
          return true
        }
      }
    }
    return false
  }

  pagination(): { items: T[]; pagination: { total: number; limit: number; offset: number; pages: number } } {
    const page = this.queryStr.page ? Number(this.queryStr.page) : 1
    const limit = this.queryStr.limit ? Number(this.queryStr.limit) : 100
    const offset = this.queryStr.offset ? Number(this.queryStr.offset) : (page - 1) * limit

    const paginatedItems = this.items.slice(offset, offset + limit)

    return {
      items: paginatedItems,
      pagination: {
        total: this.items.length,
        limit,
        offset,
        pages: Math.ceil(this.items.length / limit),
      },
    }
  }
}

export default APIFilter
