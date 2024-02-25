import { promises as fsPromises } from 'fs'
import path from 'path'
import { Company, Employee } from '../types'

let companies: Company[] = []
let employees: Employee[] = []

const readJsonFiles = async (directory: string) => {
  const fileNames = await fsPromises.readdir(directory)
  const dataPromises = fileNames.map(async fileName => {
    const filePath = path.join(directory, fileName)
    const fileContents = await fsPromises.readFile(filePath, 'utf8')
    return JSON.parse(fileContents)
  })
  const filesData = await Promise.all(dataPromises)
  return filesData.flat() // Flatten the array of arrays into a single array
}

// Function to nest employees within their respective companies
const nestEmployeesInCompanies = (companies: Company[], employees: Employee[]) => {
  return companies.map(company => {
    const nestedEmployees = employees.filter(employee => employee.company_id === company.id)
    return { ...company, employees: nestedEmployees }
  })
}

export const seedData = async () => {
  const companiesPath = path.join(process.cwd(), 'src', 'seeder', 'companies')
  const employeesPath = path.join(process.cwd(), 'src', 'seeder', 'employees')

  companies = await readJsonFiles(companiesPath)
  employees = await readJsonFiles(employeesPath)

  // Nest employees within companies after loading the data
  companies = nestEmployeesInCompanies(companies, employees)
}

export const fetchCompanies = () => companies
export const fetchEmployees = () => employees
