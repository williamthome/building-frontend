<script src="./main.ts" lang="ts">
  import { onMount } from 'svelte'
  import { Loading, NavBar, RouterContainer } from './components'
  import { currentPath } from './store'
  import { routes } from './config'
  import { isValidRoute } from './helpers'

  onMount(() => {
    addEventListener('popstate', async ({ state }) => {
      if (state?.path) {
        const { path } = state

        if (isValidRoute(path)) {
          const route = routes[path]
          if (route.locked) return history.forward()
        }

        if ($currentPath !== path) currentPath.set(path)
      }
    })
  })
</script>

<Loading />
<NavBar />
<RouterContainer />
