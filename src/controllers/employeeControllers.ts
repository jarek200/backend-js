import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import { fetchEmployees } from '../seeder/seeder'
import { ErrorHandler } from '../utils'

// Get all employees -> /employees
export const getEmployees = catchAsyncErrors(async (req, res, next) => {
  const employees = fetchEmployees()

  res.status(200).json(employees)
})

// Get company details -> /employees/:id
export const getSingleEmployee = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params
  const employee = fetchEmployees().find(employee => employee.id === parseInt(id))
  if (!employee) {
    return next(new ErrorHandler('Employee not found', 404))
  }
  res.status(200).json(employee)
})
