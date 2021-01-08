import { writable, derived } from 'svelte/store'
import { routes } from '../config'
import type { RoutePath } from '../config'
import { isValidRoute } from '../helpers'
import type { User } from '../models'

// App

export const loading = writable(false)

// Route

export const currentPath = writable<RoutePath>(location.pathname as RoutePath)

// export const safeSetCurrentPath = (path: string, valid: boolean): boolean => {
//   if (!valid || !isValidRoute(path)) return false
//   currentPath.set(path)
//   return true
// }

export const currentRoute = derived(currentPath, ($currentPath) => {
  if (!isValidRoute($currentPath)) {
    currentPath.set('/404')
    return routes['/404']
  }

  const route = routes[$currentPath]
  if (!route.locked && history.state?.path !== $currentPath)
    history.pushState({ path: $currentPath }, route.name, location.origin + $currentPath)

  return route
})

// User

export const user = writable<User | undefined>(undefined)
export const loggedIn = derived(user, ($user) => $user !== undefined)
