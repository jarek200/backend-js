import winston, { format } from 'winston'
import expressWinston from 'express-winston'
import dotenv from 'dotenv'

dotenv.config({ path: 'src/config/config.env' })

// Define base options for the logger
const baseLoggerOptions = {
  transports: [new winston.transports.Console()],
  format: format.combine(format.timestamp(), format.json(), format.prettyPrint()),
  meta: true,
  expressFormat: true,
  colorize: false,
}

// Function to get environment-specific logger options
function getLoggerOptions(env: string) {
  switch (env) {
    case 'DEVELOPMENT':
      return {
        ...baseLoggerOptions,
        format: format.combine(
          format.align(),
          format.prettyPrint(),
          format.cli({
            colors: {
              info: 'blue',
              error: 'red',
              warn: 'yellow',
            },
          }),
          format.timestamp()
        ),
        colorize: true,
        expressFormat: false,
      }
    case 'PRODUCTION':
      return {
        ...baseLoggerOptions,
        format: format.combine(format.uncolorize(), format.json(), format.prettyPrint()),
      }
    default:
      return baseLoggerOptions
  }
}

const environment = process.env.NODE_ENV || 'DEVELOPMENT'
const loggerOptions = getLoggerOptions(environment)

const logger = winston.createLogger(loggerOptions)

const middleware = expressWinston.logger(loggerOptions)

export const loggerMiddleware = middleware
export default logger
