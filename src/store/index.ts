import { writable, derived } from 'svelte/store'
import { routes } from '@/config'
import type { RoutePath } from '@/config'
import type { User, Plan } from '@/models'

// App

export const loading = writable(false)

// Route

export const currentPath = writable<RoutePath | undefined>(undefined)
export const currentRoute = derived(currentPath, ($currentPath) =>
  $currentPath ? routes[$currentPath] : undefined
)

// User

export const user = writable<User | undefined>(undefined)

// PLAN

export const plans = writable<Plan[] | undefined>(undefined)
