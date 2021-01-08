<script lang="ts">
  import { currentPath /* , loggedIn */ } from '../store'
  import { routes } from '../config'
  import type { RoutePath } from '../config'
  // import { isRouteProtected } from '../helpers'
  import { NavItem } from '.'

  export let pagePath: RoutePath

  function redirectTo() {
    if ($currentPath === pagePath) return
    // if (isRouteProtected(pagePath, $loggedIn)) return
    $currentPath = pagePath
  }
</script>

<NavItem href="{pagePath}" label="{routes[pagePath].name}" action="{redirectTo}" />
