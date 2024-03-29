import { get } from 'svelte/store'
import { getCookie } from '@/helpers'
import type { RouteConfig } from '@/protocols'
import { user } from '@/store'

export const routePaths = [
  '/',
  '/register',
  '/login',
  '/profile',
  '/company/:id',
  '/company',
  '/company/:id/building',
  '/company/:companyId/building/:id',
  '/404'
] as const

export type RoutePath = typeof routePaths[number]

export const routes: RouteConfig<RoutePath> = {
  '/': {
    component: async () =>
      (
        await import(
          /* webpackPrefetch: true */ /* webpackChunkName: "home" */ '@/pages/Home.svelte'
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
          /* webpackPrefetch: true */ /* webpackChunkName: "register" */ '@/pages/user/Register.svelte'
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
          /* webpackPrefetch: true */ /* webpackChunkName: "login" */ '@/pages/user/Login.svelte'
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
          /* webpackPrefetch: true */ /* webpackChunkName: "profile" */ '@/pages/user/Profile.svelte'
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
          /* webpackPrefetch: true */ /* webpackChunkName: "company-view" */ '@/pages/company/ViewCompany.svelte'
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
          /* webpackPrefetch: true */ /* webpackChunkName: "company-add" */ '@/pages/company/AddCompany.svelte'
        )
      ).default
  },
  '/company/:id/building': {
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
          /* webpackPrefetch: true */ /* webpackChunkName: "building-add" */ '@/pages/building/AddBuilding.svelte'
        )
      ).default
  },
  '/company/:companyId/building/:id': {
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
          /* webpackPrefetch: true */ /* webpackChunkName: "building-view" */ '@/pages/building/ViewBuilding.svelte'
        )
      ).default
  },
  '/404': {
    component: async () =>
      (await import(/* webpackPrefetch: true */ /* webpackChunkName: "404" */ '@/pages/404.svelte'))
        .default
  }
}
