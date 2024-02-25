import cachingServices from '../services/cachingServices'

export default cachingServices.cache.middleware('5 minutes', (req: any, res: Response) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE' || req.method === 'PATCH') {
    // clear the cache for POST, PUT, DELETE requests
    return false
  }
  return true
})
