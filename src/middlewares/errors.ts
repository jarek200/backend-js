import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../types'

const errorMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  // Basic error
  let error = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Internal Server Error',
  }

  // Send a unified error response
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  })
}

export default errorMiddleware
