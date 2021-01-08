<script lang="ts">
  import { beforeUpdate } from 'svelte'
  import { loggedIn, currentPath } from '../store'

  beforeUpdate(() => {
    if (!$loggedIn) return ($currentPath = '/login')
  })
</script>

<h1>Profile page</h1>

<style>
  h1 {
    color: purple;
  }
</style>
