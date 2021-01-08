// https://developer.mozilla.org/pt-PT/docs/DOM/document.cookie

type Cookie = 'accessToken'

export const setCookie = <TValue extends string | undefined>(opts: {
  cookie: Cookie
  value: TValue
  expires?: TValue extends string
    ? {
        in: number
        unit: TimeUnit
      }
    : never
}): string => {
  const { cookie: name, value, expires } = opts
  const expiresIn = cookieExpirationToUTCString(expires)
  return (document.cookie = `${name}=${value};expires=${expiresIn};path=/`)
}

export const getCookie = (cookie: Cookie): string | undefined => {
  const value = '; ' + document.cookie
  const parts = value.split('; ' + cookie + '=')

  if (parts.length === 2) return parts.pop()?.split(';').shift()

  return undefined
}

export const deleteCookie = (name: Cookie): void => {
  setCookie({ cookie: name, value: undefined })
}

type TimeUnit = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year'

const secondInMilliseconds = 1000
const minuteInMilliseconds = secondInMilliseconds * 60
const hourInMilliseconds = minuteInMilliseconds * 60
const dayInMilliseconds = hourInMilliseconds * 24
const monthInMilliseconds = dayInMilliseconds * 30
const yearInMilliseconds = monthInMilliseconds * 12 + dayInMilliseconds * 5

const toMilliseconds = (value: number, valueUnit: TimeUnit): number => {
  const convertMultiplier =
    valueUnit === 'millisecond'
      ? 1
      : valueUnit === 'second'
      ? secondInMilliseconds
      : valueUnit === 'minute'
      ? minuteInMilliseconds
      : valueUnit === 'hour'
      ? hourInMilliseconds
      : valueUnit === 'day'
      ? dayInMilliseconds
      : valueUnit === 'month'
      ? monthInMilliseconds
      : valueUnit === 'year'
      ? yearInMilliseconds
      : 0

  return value * convertMultiplier
}

const cookieExpirationToUTCString = (expires?: { in: number; unit: TimeUnit }): string => {
  const d = new Date()
  if (expires) d.setTime(d.getTime() + toMilliseconds(expires.in, expires.unit))
  return d.toUTCString()
}
