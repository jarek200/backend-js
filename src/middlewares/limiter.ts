import rateLimit from 'express-rate-limit'
import ErrorHandler from '../utils/errorHandler'

export default rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(new ErrorHandler('Too many requests, please try again later.', 429))
  },
})
