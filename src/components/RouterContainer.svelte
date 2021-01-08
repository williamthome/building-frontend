<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { currentRoute } from '../store'

  let component: unknown
  let unsubscribe: () => void

  onMount(() => {
    unsubscribe = currentRoute.subscribe(async (route) => {
      component = await route.component()
    })
  })

  onDestroy(unsubscribe)
</script>

{#if component}
  <main class="main-container">
    <svelte:component this="{component}" />
  </main>
{/if}
