import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import { fetchCompanies } from '../seeder/seeder'
import { ErrorHandler } from '../utils'
import APICompanyFilter from '../utils/apiFilters/apiCompanyFilter'
import APICompanyIdFilter from '../utils/apiFilters/apiCompanyIdFilter'
import validateResponseData from '../utils/validationSchema'

// Get all companies -> /companies
// Example: /companies?limit=10&keyword=Technology/employeeName
export const getCompanies = catchAsyncErrors(async (req, res, next) => {
  try {
    // Fetch the initial list of companies
    const companies = fetchCompanies()
    // Log validation errors if any
    validateResponseData(companies, false)

    // Instantiate APIFilters with the companies data and query parameters from the request
    const filters = new APICompanyFilter(companies, req.query as Record<string, string>)

    // Apply search, filter, and pagination methods in sequence
    const result = filters.dynamicSearch().filter().pagination()

    validateResponseData(result.items, true)
    res.status(200).json({
      success: true,
      data: result.items,
      pagination: result.pagination,
    })
  } catch (error) {
    next(error)
  }
})

// Get company details -> /companies/:ids
// Example: /companies/1,2,3
export const getSingleCompany = catchAsyncErrors(async (req, res, next) => {
  // Fetch all companies asynchronously
  const companies = fetchCompanies()

  // Initialize the filter with the companies and the query string
  const filter = new APICompanyIdFilter(companies, req.params)

  // Apply filtering based on the provided IDs
  const filteredCompanies = filter.filterById().pagination()

  // If no companies found, return a 404 error
  if (filteredCompanies.items.length === 0) {
    return next(new ErrorHandler('No companies found', 404))
  }

  // Respond with the filtered companies
  res.status(200).json({
    success: true,
    data: filteredCompanies.items,
    pagination: filteredCompanies.pagination,
  })
})
