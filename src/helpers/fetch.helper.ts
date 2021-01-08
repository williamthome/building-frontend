import type { HttpClientOptions } from '../protocols'

export const isResponseError = (obj: unknown): obj is { error: string } =>
  typeof obj === 'object' && !!obj && 'error' in obj

export const isTimeoutError = (obj: unknown): obj is DOMException =>
  obj instanceof DOMException && obj.name === 'AbortError'

export const isNetworkError = (obj: unknown): obj is { error: string } =>
  obj instanceof Error && obj.message === 'Network Error'

export const formatUri = <TRequest>(
  opts: Pick<HttpClientOptions<TRequest>, 'uri' | 'params' | 'query'> & { baseUrl: string }
): string => {
  const { baseUrl, uri, params, query } = opts
  let uriWithParamsAndQuery = baseUrl + uri
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      uriWithParamsAndQuery = uriWithParamsAndQuery.replace(`:${key}`, value)
    }
  }
  if (query) {
    uriWithParamsAndQuery = `${uriWithParamsAndQuery}?`
    const queryEntries = Object.entries(query)
    const queryKeys = Object.keys(query)
    for (const [key, value] of queryEntries) {
      uriWithParamsAndQuery = `${uriWithParamsAndQuery}${key}=${value}${
        queryKeys.indexOf(key) !== queryEntries.length - 1 ? '&' : ''
      }`
    }
  }
  return uriWithParamsAndQuery
}
