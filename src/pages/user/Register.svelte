<script lang="ts">
  import { user, loading } from '@/store'
  import type { Authentication, Registration, User } from '@/models'
  import { formDataToJSON, navigateTo, setCookie, setLocalStorage } from '@/helpers'

  async function register(event: Event) {
    $loading = true

    const form = event.target
    const dto = formDataToJSON<Registration>(form!)

    const api = (await import(/* webpackChunkName: "api" */ '@/api')).default

    await api.fetch<Registration, { user: User; verificationToken: string }>({
      requestOpts: {
        method: 'POST',
        uri: '/user',
        body: dto
      },
      onSuccess: async ({ verificationToken }) => {
        /**
         * !! WARN: THIS IS ONLY FOR DEV PURPOSE !!
         *
         * Remove this fetch method for production
         * Copy and paste 'onSuccess' method
         */
        await api.fetch({
          requestOpts: {
            method: 'POST',
            uri: '/user/verify',
            query: {
              token: verificationToken
            }
          },
          onSuccess: async () => {
            await api.fetch<Authentication, User>({
              requestOpts: {
                method: 'POST',
                uri: '/login',
                body: {
                  email: dto.email,
                  password: dto.password
                }
              },
              onSuccess: (loginUserResponse) => {
                setCookie({
                  cookie: 'accessToken',
                  value: loginUserResponse.accessToken,
                  expires: {
                    in: 1,
                    unit: 'hour'
                  }
                })
                setLocalStorage('lastLoggedMail', loginUserResponse.email)

                $user = loginUserResponse
                navigateTo('/profile')
              }
            })
          },
          onError: ({ error }) => {
            console.error(error)
            alert('Error! ' + error)
          }
        })
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
