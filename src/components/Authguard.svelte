<script>
  import { loggedIn } from '../store'
</script>

{#if $loggedIn}
  <slot />
{:else}
  <slot name="unauth" />
{/if}
