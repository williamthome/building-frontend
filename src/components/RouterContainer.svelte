<script lang="ts">
  import { currentRoute } from '@/store'

  let component: unknown
  $: $currentRoute?.component().then((c) => (component = c))
</script>

{#if component}
  <main class="main-container">
    <svelte:component this="{component}" />
  </main>
{/if}
