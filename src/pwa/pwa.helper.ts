import { DEBUG, CACHING_DURATION, SW_EXPIRES_HEADER_NAME } from './pwa.config'

export const log = (...data: unknown[]) => DEBUG && console.log('[SERVICE WORKER]', data)
export const error = (...data: unknown[]) => DEBUG && console.error('[SERVICE WORKER]', data)

/**
 * Clear all caches of the ServiceWorker.
 */
export const clearServiceWorkerCache = async (): Promise<void> => {
  const keys = await self.caches.keys()
  for (const key of keys) {
    await self.caches.delete(key)
  }
}

/**
 * Get duration (in s) before (cache) expiration from headers of a fetch request
 * @param headers
 */
export const getExpiresFromHeaders = (headers: Headers) => {
  // Try to use the Cache-Control header (and max-age)
  if (headers.get('cache-control')) {
    const maxAge = headers.get('cache-control').match(/max-age=(\d+)/)
    return parseInt(maxAge ? maxAge[1] : '0', 10)
  }

  // Otherwise try to get expiration duration from the Expires header
  if (headers.get('expires')) {
    return (
      parseInt((new Date(headers.get('expires')).getTime() / 1000).toString(), 10) -
      new Date().getTime()
    )
  }
  return null
}

/**
 * Cache url
 */
export const cacheUrl = async (
  cache: Cache,
  ref: 'Pre-caching' | 'Updating',
  url: string
): Promise<Response> =>
  await fetch(url).then(async (response) => {
    // Compute expires date from caching duration
    const expires = new Date()
    expires.setSeconds(expires.getSeconds() + CACHING_DURATION)

    // Recreate a Response object from scratch to put it in the cache,
    // with the extra header for managing cache expiration
    const cachedResponseFields = {
      status: response.status,
      statusText: response.statusText,
      headers: { [SW_EXPIRES_HEADER_NAME]: expires.toUTCString() }
    }
    response.headers.forEach((v, k) => {
      cachedResponseFields.headers[k] = v
    })

    // We will consume body of the live response,
    // so clone it  before to be able to return it afterwards
    const returnedResponse = response.clone()
    return response.blob().then((body) => {
      log(`${ref} ${url} until ${expires.toUTCString()}`)
      // Put the duplicated response in the cache
      cache.put(url, new Response(body, cachedResponseFields))
      // Return the cache response from the network
      return returnedResponse
    })
  })
