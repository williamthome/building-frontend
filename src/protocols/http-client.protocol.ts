export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export enum HttpHeaderName {
  AUTHORIZATION = 'Authorization'
}

export type HttpHeaders = Partial<Record<HttpHeaderName | string, string>>

export type HttpParameters = { [x: string]: string }

export type HttpQuery = { [x: string]: string }

export interface HttpClientOptions<T = unknown> {
  method: HttpMethod
  uri: string
  body?: T
  params?: HttpParameters
  query?: HttpQuery
  files?: File[]
}

export interface HttpClientError {
  error: string
}

export interface HttpClient {
  fetch: <TRequest, TResponse>(opts: {
    requestOpts: HttpClientOptions<TRequest>
    onSuccess?: (response: TResponse) => void | Promise<void>
    onError?: (error: HttpClientError) => void | Promise<void>
    finally?: () => void | Promise<void>
  }) => Promise<void>
}
