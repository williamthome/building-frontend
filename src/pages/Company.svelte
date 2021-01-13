<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { loading, user } from '../store'
  import type { Company } from '../models'
  import { navigateTo } from '../helpers'

  let company: Company

  onMount(
    async (): Promise<void> => {
      if ($user!.lastActiveCompany?.id === $user!.activeCompanyId) {
        company = $user!.lastActiveCompany!
        return
      }

      $loading = true

      const api = (await import(/* webpackChunkName: "api" */ '../api')).default

      await api.fetch<undefined, Company>({
        requestOpts: {
          method: 'GET',
          uri: '/user/active-company'
        },
        onSuccess: (activeCompany) => {
          company = activeCompany
          $user!.activeCompanyId = company.id
        },
        onError: ({ error }) => {
          alert(error)
          navigateTo('/profile')
        }
      })

      $loading = false
    }
  )

  onDestroy(() => {
    if ($user) $user!.lastActiveCompany = company
  })
</script>

{#if company}
  <h2>Welcome to <i>{company.name}</i> page</h2>
{/if}

<style>
  h2 {
    color: red;
  }
</style>
