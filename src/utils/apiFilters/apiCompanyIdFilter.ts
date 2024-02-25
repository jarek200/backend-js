import { Company, QueryString } from '../../types'
import APIFilter from './apiFilter'

class APICompanyIdFilter<T extends Company> extends APIFilter<T> {
  constructor(items: T[], queryStr: QueryString) {
    super(items, queryStr)
  }

  filterById(): this {
    const ids = this.queryStr.id

    if (ids) {
      const idArray = ids.split(',')
      this.items = this.items.filter(item => idArray.includes(String(item.id)))
    }
    return this
  }
}

export default APICompanyIdFilter
