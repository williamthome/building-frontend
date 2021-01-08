<script lang="ts">
  import { currentPath } from '../store'

  export let href: string | undefined = undefined
  export let label: string
  export let action: (() => any) | undefined = undefined
</script>

<a
  href="{href}"
  class:current="{href && $currentPath === href}"
  on:click|preventDefault="{action}"
>{label}</a>

<style lang="scss">
  a {
    text-transform: uppercase;
    text-decoration: underline;
    padding: 1rem;

    &.current {
      color: red;
    }
  }
</style>
