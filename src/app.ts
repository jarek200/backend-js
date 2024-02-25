import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import { corsMiddleware, errorMiddleware, limiterMiddleware, cachingMiddleware, swagger } from './middlewares'
import { seedData } from './seeder/seeder'
import compression from 'compression'
import actuator from 'express-actuator'
import companyRoutes from './routes/companies'
import employeeRoutes from './routes/employees'
import logger, { loggerMiddleware } from './middlewares/logger'

dotenv.config({ path: 'src/config/config.env' })

// 1. Create an Express application
const app = express()
// 2. Seed the data
seedData()
// 3. Setup Generic Middlewares
// 3.0.1 Add the Helmet middleware
app.use(helmet())
// 3.0.2 Add the CORS middleware
app.use(corsMiddleware())
// 3.0.3 Add the Limiter middleware
app.use(limiterMiddleware)
// 3.0.4 Add the caching middleware
if (process.env.NODE_ENV === 'PRODUCTION') app.use(cachingMiddleware)
// 3.0.5. Add the compression middleware
app.use(
  compression({
    level: 6,
    threshold: 1,
  })
)
// 3.1. Add the body parser (Body Text to JSON)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// 3.2 Add logger middleware
app.use(loggerMiddleware)
// 3.3. Add the Swagger UI
app.use('/docs', ...swagger())
// 3.4. Add the health check middleware
app.use(actuator())
// Importing routes
app.use(companyRoutes)
app.use(employeeRoutes)

// Middleware to handle errors asyncErrors
app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
  logger.info(`Server is running on localhost:${process.env.PORT}`)
  logger.info(`Server is running in mode:${process.env.NODE_ENV}`)
})

export default app
