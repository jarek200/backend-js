import { Request, Response, NextFunction } from 'express'
import { ControllerFunction } from '../types'

export default (controllerFunction: ControllerFunction) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(controllerFunction(req, res, next)).catch(next)
  }
