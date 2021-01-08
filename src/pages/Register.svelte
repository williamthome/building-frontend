<script lang="ts">
  import { beforeUpdate } from 'svelte'
  import { user, loggedIn, currentPath, loading } from '../store'
  import { routes } from '../config'
  import type { Registration, User } from '../models'
  import { formDataToJSON, setCookie, setLocalStorage } from '../helpers'

  beforeUpdate(() => {
    if ($loggedIn) return ($currentPath = '/profile')
  })

  async function register(event: Event) {
    $loading = true

    const form = event.target
    const dto = formDataToJSON<Registration>(form)

    const api = (await import(/* webpackChunkName: "api" */ '../api')).default

    await api.fetch<Registration, { user: User; verificationToken: string }>({
      requestOpts: {
        method: 'POST',
        uri: '/user',
        body: dto
      },
      onSuccess: async ({ user: userResponse }) => {
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
        routes['/login'].locked = true
        $currentPath = '/profile'
      },
      onError: ({ error }) => {
        console.error(error)
        alert('Error! ' + error)
      }
    })

    $loading = false
  }
</script>

<h1>Register page</h1>
<form on:submit|preventDefault="{register}">
  <div>
    <label for="email">E-mail</label>
    <input id="email" type="email" name="email" placeholder="Enter your e-mail" required />
  </div>
  <div>
    <label for="password">Password</label>
    <input
      id="password"
      type="password"
      name="password"
      placeholder="Enter your password"
      required
      minlength="6"
    />
  </div>
  <div>
    <label for="passwordConfirmation">Password Confirmation</label>
    <input
      id="passwordConfirmation"
      type="password"
      name="passwordConfirmation"
      placeholder="Confirm your password"
      required
    />
  </div>
  <input type="submit" value="Register" />
</form>

<style lang="scss">
  h1 {
    color: purple;
  }
</style>
