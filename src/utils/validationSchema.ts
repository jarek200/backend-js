import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import employeeSchema from '../schemas/employees.json'
import companySchema from '../schemas/companies.json'
import logger from '../middlewares/logger'
import { Company } from '../types'

// Function to validate data with an option to coerce types
export default (data: Company[], coerceTypes: boolean = false): string | undefined => {
  const ajv = new Ajv({ allErrors: true, coerceTypes })
  addFormats(ajv)
  ajv.addSchema(employeeSchema, 'employees.json')
  ajv.addSchema(companySchema, 'companies.json')

  const validate = ajv.compile<Company[]>(companySchema)
  const valid = validate(data)

  if (!valid && !coerceTypes) {
    const errors = validate.errors?.map(error => `${error.instancePath} ${error.message}`).join(', ')
    logger.error(`Validation errors: ${errors}`)
    return errors
  }
}
