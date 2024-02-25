import YAML from 'yamljs'
import swaggerUi from 'swagger-ui-express'

export const swaggerDocument = YAML.load('./swagger.yaml')

export const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Customer API',
      description: 'Customer API Information',
      contact: {
        name: 'Amazing Developer',
      },
      servers: ['http://localhost:4000'],
    },
  },

  apis: ['app.ts'],
}

export default () => {
  return [swaggerUi.serve, swaggerUi.setup(swaggerDocument)]
}
