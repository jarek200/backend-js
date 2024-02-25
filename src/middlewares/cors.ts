import cors from 'cors'

export default () =>
  cors({
    origin: '*', // unsecure, but for the sake of the example
    methods: 'GET,HEAD,PUT,PATCH,POST',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
