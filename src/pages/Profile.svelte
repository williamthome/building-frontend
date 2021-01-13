<script lang="ts">
  import { onMount } from 'svelte'
  import { loading, user } from '../store'
  import type { UserRights, Company } from '../models'
  import { navigateTo } from '../helpers'

  $: rights = $user?.rights ?? []
  $: anyRights = rights.length > 0

  onMount(async () => {
    if ($user?.rights) return

    $loading = true

    const api = (await import(/* webpackChunkName: "api" */ '../api')).default

    await api.fetch<undefined, UserRights[]>({
      requestOpts: {
        method: 'GET',
        uri: '/user/rights'
      },
      onSuccess: async (rights) => {
        $user!.rights = rights
      }
    })

    $loading = false
  })

  async function navigateToCompanyPage(company: Company) {
    const navigate = () =>
      navigateTo('/company/:id', {
        id: company.id
      })

    if ($user!.activeCompanyId === company.id) return navigate()

    const api = (await import(/* webpackChunkName: "api" */ '../api')).default

    await api.fetch({
      requestOpts: {
        method: 'PATCH',
        uri: '/user/active-company/:companyId',
        params: {
          companyId: company.id
        }
      },
      onSuccess: () => {
        $user!.activeCompanyId = company.id

        navigate()
      },
      onError: (error) => {
        console.error(error)
      }
    })
  }
</script>

{#if $user}
  <h1>Profile page</h1>

  {#if anyRights}
    <h2>Your companies:</h2>
    <ul>
      {#each rights as { company }}
        <li>
          <button
            on:click="{async () => await navigateToCompanyPage(company)}"
          >{company.name}</button>
        </li>
      {/each}
    </ul>
  {:else}
    <h2>No companies</h2>
  {/if}
  <button
    on:click="{() => navigateTo('/company')}"
  >{anyRights ? 'Add' : 'Create your first!'}</button>
{/if}

<style>
  h1 {
    color: purple;
  }
</style>
