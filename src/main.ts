import './extensions'
import registerServiceWorker from './pwa/pwa.register'
import unregisterServiceWorker from './pwa/pwa.unregister'
import { user, loading } from './store'
import { getCookie, deleteCookie, navigateTo, navigateToBestMatch } from './helpers'
import type { User } from './models'
import App from './App.svelte'

const init = async (): Promise<void> => {
  loading.set(true)

  if (process.env.NODE_ENV === 'production') await registerServiceWorker()
  else await unregisterServiceWorker()

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
      onSuccess: (userResponse) => {
        user.set(userResponse)

        // if (userResponse.activeCompanyId)
        //   navigateTo('/company/:id', {
        //     id: userResponse.activeCompanyId
        //   })
      },
      onError: () => {
        deleteCookie('accessToken')
      }
    })
  }

  if (history.state) navigateTo(history.state.path, history.state.params)
  else navigateToBestMatch(location.pathname)

  addEventListener('popstate', ({ state }: PopStateEvent) => navigateTo(state?.path || '/'))

  loading.set(false)
}

init()

export default new App({
  target: document.body
})
