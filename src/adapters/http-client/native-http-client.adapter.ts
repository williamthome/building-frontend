import { HttpClientBaseAdapter } from '.'
import type { HttpClientOptions, HttpClientError } from '../../protocols'
import {
  getCookie,
  formatUri,
  isNetworkError,
  isResponseError,
  isTimeoutError
} from '../../helpers'

export class NativeHttpClientAdapter extends HttpClientBaseAdapter {
  protected request = async <TRequest, TResponse>(
    opts: HttpClientOptions<TRequest>
  ): Promise<TResponse | HttpClientError> => {
    try {
      const { uri, method, body, /* files, */ params, query } = opts

      const accessToken = getCookie('accessToken')

      const controller = new AbortController()
      const timeout = 7000
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const headers: Headers = new Headers()
      if (accessToken) headers.append('Authorization', `Bearer ${accessToken}`)
      if (body && method !== 'GET') headers.append('Content-Type', 'application/json')

      const response = await fetch(formatUri({ baseUrl: this.baseUrl, uri, params, query }), {
        method,
        body: method !== 'GET' ? JSON.stringify(body) : undefined,
        headers,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      const data = await response.json()

      return !isResponseError(data) ? data : { error: data.error }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : isNetworkError(error)
          ? 'A network error ocurred'
          : isTimeoutError(error)
          ? 'Request timed out'
          : error

      return { error: message }
    }
  }
}
