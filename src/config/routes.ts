import type { RouteConfig } from '../protocols'

export const routePaths = ['/', '/register', '/login', '/profile', '/404'] as const

export type RoutePath = typeof routePaths[number]

export const routes: RouteConfig<RoutePath> = {
  '/': {
    name: 'Home',
    component: async () =>
      (await import(/* webpackChunkName: "home" */ '../pages/Home.svelte')).default
  },
  '/register': {
    name: 'Register',
    component: async () =>
      (await import(/* webpackChunkName: "register" */ '../pages/Register.svelte')).default
    // guard: 'unauth'
  },
  '/login': {
    name: 'Login',
    component: async () =>
      (await import(/* webpackChunkName: "login" */ '../pages/Login.svelte')).default
    // guard: 'unauth'
  },
  '/profile': {
    name: 'Profile',
    component: async () =>
      (await import(/* webpackChunkName: "profile" */ '../pages/Profile.svelte')).default
    // guard: 'auth'
  },
  '/404': {
    name: '404',
    component: async () =>
      (await import(/* webpackChunkName: "404" */ '../pages/404.svelte')).default
  }
}
