import { Request, Response, NextFunction } from 'express'

export interface Employee {
  id: number
  first_name: string
  last_name: string
  email?: string
  role: string
  company_id: number
}

export interface Company {
  id: number
  name: string
  industry: string
  active: boolean
  website: string
  telephone: string
  slogan: string
  address: string
  city: string
  country: string
  employees: Employee[]
}

export interface QueryString {
  keyword?: string
  page?: number
  limit?: number
  offset?: number
  active?: string
  companyName?: string
  employeeName?: string

  [key: string]: any
}

export type ControllerFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>

export interface CustomError extends Error {
  statusCode?: number
}
