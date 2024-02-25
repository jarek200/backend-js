import apicache from 'apicache'

class CachingService {
  cache: any
  constructor() {
    // Set the cache
    this.cache = apicache.options({
      debug: true,
      respectCacheControl: true,
    })
  }
}

export default new CachingService()
