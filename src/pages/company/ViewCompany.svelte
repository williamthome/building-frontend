<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { loading, user } from '@/store'
  import type { Building, Company } from '@/models'
  import { navigateTo } from '@/helpers'

  let company: Company | undefined = undefined

  $: buildings = company?.buildings ?? []
  $: anyBuilding = company?.buildings ? company.buildings.length > 0 : false

  onMount(
    async (): Promise<void> => {
      if ($user!.lastActiveCompany?.id === $user!.activeCompanyId) {
        company = $user!.lastActiveCompany!
        return
      }

      $loading = true

      const api = (await import(/* webpackChunkName: "api" */ '@/api')).default

      let companyResponse: Company | undefined = undefined
      let buildingsResponse: Building[] = []

      await Promise.all([
        api.fetch<undefined, Company>({
          requestOpts: {
            method: 'GET',
            uri: '/user/active-company'
          },
          onSuccess: (activeCompany) => {
            companyResponse = activeCompany
          },
          onError: ({ error }) => {
            alert(error)
            navigateTo('/profile')
          }
        }),
        api.fetch<undefined, Building[]>({
          requestOpts: {
            method: 'GET',
            uri: '/company/buildings'
          },
          onSuccess: (activeCompanyBuildings) => {
            buildingsResponse = activeCompanyBuildings
          },
          onError: ({ error }) => {
            alert(error)
          }
        })
      ])

      company = companyResponse!
      company.buildings = buildingsResponse

      $user!.activeCompanyId = company.id

      $loading = false
    }
  )

  onDestroy(() => {
    if ($user) $user!.lastActiveCompany = company
  })
</script>

{#if company}
  <h2>Welcome to <i>{company.name}</i> page</h2>

  {#if anyBuilding}
    <h2>Your buildings:</h2>
    <ul>
      {#each buildings as { id, title }}
        <li>
          <button
            on:click="{() => company && navigateTo('/company/:companyId/building/:id', {
                companyId: company.id,
                id
              })}"
          >{title}</button>
        </li>
      {/each}
    </ul>
  {:else}
    <h2>No buildings</h2>
  {/if}
  <button
    on:click="{() => company && navigateTo('/company/:id/building', { id: company.id })}"
  >{anyBuilding ? 'Add' : 'Create your first!'}</button>
{/if}

<style>
  h2 {
    color: red;
  }
</style>
