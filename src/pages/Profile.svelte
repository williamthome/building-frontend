<script lang="ts">
  import { beforeUpdate } from 'svelte'
  import { loggedIn, currentPath, loading, user } from '../store'
  import type { UserRights } from '../models'

  beforeUpdate(async () => {
    if (!$loggedIn) return ($currentPath = '/login')
    if ($user.rights) return

    $loading = true

    const api = (await import(/* webpackChunkName: "api" */ '../api')).default

    await api.fetch<undefined, UserRights[]>({
      requestOpts: {
        method: 'GET',
        uri: '/user/rights'
      },
      onSuccess: async (rights) => {
        $user.rights = rights
      }
    })

    $loading = false
  })
</script>

<h1>Profile page</h1>

{#if $user.rights?.length > 0}
  <h2>Your companies:</h2>
  <ul>
    {#each $user.rights as { company }, i}
      <li>{company.name}</li>
    {/each}
  </ul>
{:else}
  <h2>No companies</h2>
  <button> Create your first! </button>
{/if}

<style>
  h1 {
    color: purple;
  }
</style>
