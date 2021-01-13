import { routePaths, RoutePath } from '@/config'

export const isValidRoute = (obj: unknown): obj is RoutePath =>
  typeof obj === 'string' && routePaths.includes(obj as RoutePath)
