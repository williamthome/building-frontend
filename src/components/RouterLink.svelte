<script lang="ts">
  import { currentPath } from '../store'
  import type { RoutePath } from '../config'
  import type { HttpParameters, HttpQuery } from '../protocols'
  import { formatUri, navigateTo } from '../helpers'

  export let to: RoutePath | undefined = undefined
  export let label: string
  export let beforeNavigate: (() => any) | undefined = undefined
  export let afterNavigate: (() => any) | undefined = undefined
  export let onClick: (() => any) | undefined = undefined
  export let params: HttpParameters | undefined = undefined
  export let query: HttpQuery | undefined = undefined

  $: uri = formatUri({ uri: to, params, query })

  async function action() {
    if (to) {
      if ($currentPath === to) return
      if (beforeNavigate) await beforeNavigate()
      navigateTo(to)
      if (afterNavigate) await afterNavigate()
    }
    if (onClick) await onClick()
  }
</script>

<a
  href="{uri ?? 'javascript:void(0)'}"
  class:current="{to && $currentPath === to}"
  on:click|preventDefault="{action}"
>{label}</a>

<style lang="scss">
  a {
    text-transform: uppercase;
    text-decoration: underline;
    padding: 1rem;

    &.current {
      color: white;
      background-color: black;
    }
  }
</style>
