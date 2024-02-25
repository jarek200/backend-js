import { Company, QueryString } from '../../types'
import APIFilter from './apiFilter'

class APICompanyFilter extends APIFilter<Company> {
  constructor(items: Company[], queryStr: QueryString) {
    super(items, queryStr)
  }

  filter(): this {
    if (this.queryStr.active !== undefined) {
      const isActive = this.queryStr.active === 'true'
      this.items = this.items.filter(company => company.active === isActive)
    }

    // Filter by company name
    if (this.queryStr.companyName) {
      this.items = this.items.filter(company => company.name.toLowerCase().includes(this?.queryStr?.companyName?.toLowerCase() ?? ''))
    }

    // Filter by employee name
    if (this.queryStr.employeeName) {
      this.items = this.items.filter(company =>
        company.employees.some(employee =>
          `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(this?.queryStr?.employeeName?.toLowerCase() ?? '')
        )
      )
    }

    return this
  }
}

export default APICompanyFilter
