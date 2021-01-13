import { isValidRoute } from '.'
import { RoutePath, routePaths, routes } from '../config'
import { currentPath } from '../store'

export const navigateTo = async (
  path: RoutePath,
  params?: Record<string, string>
): Promise<void> => {
  if (!isValidRoute(path)) navigateTo('/404')

  const { validations } = routes[path]

  if (validations) {
    let i = 0
    for (const validate of validations) {
      const { valid, ifInvalid } = validate

      const isValid = valid instanceof Promise ? await valid() : valid()

      if (!isValid) {
        if (ifInvalid) {
          const { do: action, redirectTo: validPath } = ifInvalid
          if (action) action instanceof Promise ? await action() : action()
          if (validPath) return navigateTo(validPath)
        }
        if (i === validations.length - 1) return
      }

      i++
    }
  }

  let uri = path as string
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      uri = uri.replace(':' + key, value)
    }
  }

  history.state?.path !== path && history.pushState({ path, params }, document.title, uri)

  currentPath.set(path)
}

export const navigateToBestMatch = (path: string): void => {
  const base = path.startsWith('/') ? path.slice(1).split('/') : path.split('/')
  const baseLength = path.startsWith('/') ? base.length + 1 : base.length
  if (base.every((uri) => uri === '')) navigateTo('/')

  let i = 0
  const toCompare: number[] = []
  for (const uri in routes) {
    const uriPieces = uri.split('/')

    let count = 0
    if (uriPieces.length === baseLength) {
      for (const b of base) uriPieces.includes(b) && count++
      base[base.length - 1].includes(':') &&
        uriPieces[uriPieces.length - 1].includes(':') &&
        count++
    }
    toCompare[i] = count

    i++
  }

  const max = Math.max(...toCompare.map((i) => i))
  const maxIndex = toCompare.indexOf(max)

  const bestMatch = routePaths[maxIndex]
  const bestMatchParams = getUriParams(bestMatch, path)

  navigateTo(isValidRoute(bestMatch) ? bestMatch : '/404', bestMatchParams)
}

export const getUriParams = (routePath: RoutePath, uri: string): Record<string, string> => {
  const pathPieces = routePath.split('/')
  const uriPieces = uri.split('/')

  if (pathPieces.length !== uriPieces.length) throw new Error('Invalid uri')

  const params: Record<string, string> = {}
  for (const index in pathPieces) {
    if (!pathPieces[index].includes(':')) continue
    const key = pathPieces[index].slice(1)
    params[key] = uriPieces[index]
  }

  return params
}
