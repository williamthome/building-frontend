import { get } from 'svelte/store'
import { getCookie } from '../helpers'
import type { RouteConfig } from '../protocols'
import { user } from '../store'

export const routePaths = [
  '/',
  '/register',
  '/login',
  '/profile',
  '/company/:id',
  '/company',
  '/404'
] as const

export type RoutePath = typeof routePaths[number]

export const routes: RouteConfig<RoutePath> = {
  '/': {
    component: async () =>
      (
        await import(
          /* webpackPrefetch: true */ /* webpackChunkName: "home" */ '../pages/Home.svelte'
        )
      ).default
  },
  '/register': {
    validations: [
      {
        valid: () => !getCookie('accessToken') || !get(user),
        ifInvalid: {
          redirectTo: '/profile'
        }
      }
    ],
    component: async () =>
      (
        await import(
          /* webpackPrefetch: true */ /* webpackChunkName: "register" */ '../pages/Register.svelte'
        )
      ).default
  },
  '/login': {
    validations: [
      {
        valid: () => !getCookie('accessToken') || !get(user),
        ifInvalid: {
          redirectTo: '/profile'
        }
      }
    ],
    component: async () =>
      (
        await import(
          /* webpackPrefetch: true */ /* webpackChunkName: "login" */ '../pages/Login.svelte'
        )
      ).default
  },
  '/profile': {
    validations: [
      {
        valid: () => !!getCookie('accessToken') && !!get(user),
        ifInvalid: {
          redirectTo: '/login',
          do: () => user.set(undefined)
        }
      }
    ],
    component: async () =>
      (
        await import(
          /* webpackPrefetch: true */ /* webpackChunkName: "profile" */ '../pages/Profile.svelte'
        )
      ).default
  },
  '/company/:id': {
    validations: [
      {
        valid: () => !!getCookie('accessToken') && !!get(user),
        ifInvalid: {
          redirectTo: '/login',
          do: () => user.set(undefined)
        }
      },
      {
        valid: () => !!get(user)?.activeCompanyId,
        ifInvalid: {
          redirectTo: '/profile'
        }
      }
    ],
    component: async () =>
      (
        await import(
          /* webpackPrefetch: true */ /* webpackChunkName: "company-view" */ '../pages/Company.svelte'
        )
      ).default
  },
  '/company': {
    validations: [
      {
        valid: () => !!getCookie('accessToken') && !!get(user),
        ifInvalid: {
          redirectTo: '/login',
          do: () => user.set(undefined)
        }
      }
    ],
    component: async () =>
      (
        await import(
          /* webpackPrefetch: true */ /* webpackChunkName: "company-add" */ '../pages/AddCompany.svelte'
        )
      ).default
  },
  '/404': {
    component: async () =>
      (
        await import(
          /* webpackPrefetch: true */ /* webpackChunkName: "404" */ '../pages/404.svelte'
        )
      ).default
  }
}
