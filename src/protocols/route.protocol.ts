import type { RoutePath } from '../config'

interface Route {
  component: (...args: unknown[]) => Promise<unknown>
  validations?: {
    valid: () => boolean | Promise<boolean>
    ifInvalid?: {
      redirectTo?: RoutePath
      do?: () => void | Promise<void>
    }
  }[]
}

export type RouteConfig<T extends string> = { [K in T]: Route }
