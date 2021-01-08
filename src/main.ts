import { user, loading } from './store'
import { getCookie, deleteCookie } from './helpers'
import type { User } from './models'
import App from './App.svelte'

const init = async (): Promise<App> => {
  loading.set(true)

  if (process.env.NODE_ENV === 'production') {
    const registerServiceWorker = (await import('./pwa/pwa.register')).default
    await registerServiceWorker()
  } else {
    if (window.caches) {
      const keys = await window.caches.keys()
      if (keys.length > 0) {
        console.log('[PURGE CACHES]', 'Running...')
        for (const key of keys) await window.caches.delete(key)
        console.log('[PURGE CACHES]', 'Ok')
      }
    }
  }

  const accessToken = getCookie('accessToken')

  if (accessToken) {
    const api = (await import(/* webpackChunkName: "api" */ './api')).default

    await api.fetch<string, User>({
      requestOpts: {
        method: 'GET',
        uri: '/user/by-access-token',
        query: {
          accessToken
        }
      },
      onSuccess: async (userResponse) => {
        user.set(userResponse)
      },
      onError: async () => {
        deleteCookie('accessToken')
      }
    })
  }

  loading.set(false)

  return new App({
    target: document.body
  })
}

export default init()
