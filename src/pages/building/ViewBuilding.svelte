<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { loading, user } from '@/store'
  import type { Building } from '@/models'
  import { getCurrentUriParams, navigateTo } from '@/helpers'

  let building: Building | undefined = undefined

  onMount(
    async (): Promise<void> => {
      const { id, companyId } = getCurrentUriParams('/company/:companyId/building/:id') as {
        companyId: string
        id: string
      }

      if ($user!.lastActiveBuilding?.id === id) {
        building = $user!.lastActiveBuilding!
        return
      }

      $loading = true

      const api = (await import(/* webpackChunkName: "api" */ '@/api')).default

      api.fetch<undefined, Building>({
        requestOpts: {
          method: 'GET',
          uri: '/building/:id',
          params: {
            id
          }
        },
        onSuccess: (activeBuilding) => {
          building = activeBuilding
        },
        onError: ({ error }) => {
          alert(error)
          navigateTo('/company/:id', {
            id: companyId
          })
        }
      })

      $loading = false
    }
  )

  onDestroy(() => {
    if ($user) $user!.lastActiveBuilding = building
  })
</script>

{#if building}
  <h2>Welcome to <i>{building.title}</i> page</h2>

  <button on:click="{() => building && navigateTo('/company/:id', { id: building.companyId })}">Go
    to company</button>
{/if}

<style>
  h2 {
    color: red;
  }
</style>
