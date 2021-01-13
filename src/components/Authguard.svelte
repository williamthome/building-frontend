<script>
  import { user } from '@/store'
</script>

{#if $user}
  <slot />
{:else}
  <slot name="unauth" />
{/if}
