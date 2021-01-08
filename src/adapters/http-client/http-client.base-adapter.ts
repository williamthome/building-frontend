import { isResponseError } from '../../helpers'
import type { HttpClient, HttpClientError, HttpClientOptions } from '../../protocols'

export abstract class HttpClientBaseAdapter implements HttpClient {
  protected readonly baseUrl = 'http://localhost:5051'

  fetch = async <TRequest, TResponse>(opts: {
    requestOpts: HttpClientOptions<TRequest>
    onSuccess?: (response: TResponse) => void | Promise<void>
    onError?: (error: HttpClientError) => void | Promise<void>
    finally?: () => void | Promise<void>
  }): Promise<void> => {
    const { requestOpts, onSuccess, onError, finally: onFinally } = opts
    const response = await this.request<TRequest, TResponse>(requestOpts)
    if (isResponseError(response)) {
      if (onError) await onError(response)
    } else {
      if (onSuccess) await onSuccess(response)
    }
    if (onFinally) await onFinally()
  }

  protected abstract request: <TRequest, TResponse>(
    opts: HttpClientOptions<TRequest>
  ) => Promise<TResponse | HttpClientError>
}
