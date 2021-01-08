interface Route {
  name: string
  component: () => Promise<unknown>
  locked?: boolean
  // guard?: boolean | 'auth' | 'unauth'
}

export type RouteConfig<T extends string> = { [K in T]: Route }
