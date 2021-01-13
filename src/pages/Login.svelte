<script lang="ts">
  import { user, loading } from '../store'
  import type { Authentication, User } from '../models'
  import {
    formDataToJSON,
    setCookie,
    getLocalStorage,
    setLocalStorage,
    navigateTo
  } from '../helpers'

  async function login(event: Event) {
    $loading = true

    const form = event.target
    const dto = formDataToJSON<Authentication>(form!)

    const api = (await import(/* webpackChunkName: "api" */ '../api')).default

    await api.fetch<Authentication, User>({
      requestOpts: {
        method: 'POST',
        uri: '/login',
        body: dto
      },
      onSuccess: async (userResponse) => {
        setCookie({
          cookie: 'accessToken',
          value: userResponse.accessToken,
          expires: {
            in: 1,
            unit: 'hour'
          }
        })
        setLocalStorage('lastLoggedMail', userResponse.email)

        $user = userResponse
        const { activeCompanyId } = userResponse
        if (activeCompanyId) {
          navigateTo('/company/:id', {
            id: activeCompanyId
          })
        } else navigateTo('/profile')
      },
      onError: ({ error }) => {
        console.error(error)
        alert('Error! ' + error)
      }
    })

    $loading = false
  }
</script>

<h1>Login page</h1>
<form on:submit|preventDefault="{login}">
  <div>
    <label for="email">E-mail</label>
    <input
      id="email"
      type="email"
      name="email"
      placeholder="Enter your e-mail"
      value="{getLocalStorage('lastLoggedMail')}"
      required
    />
  </div>
  <div>
    <label for="password">Password</label>
    <input
      id="password"
      type="password"
      name="password"
      placeholder="Enter your password"
      required
    />
  </div>
  <input type="submit" value="Login" />
</form>

<style lang="scss">
  h1 {
    color: purple;
  }
</style>
