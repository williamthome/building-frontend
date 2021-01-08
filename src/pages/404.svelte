<script lang="ts">
  import { currentPath } from '../store'
</script>

<h1>Error! Page not found!</h1>
<button on:click="{() => ($currentPath = '/')}">Go to home</button>

<style>
  h1 {
    color: red;
  }
</style>
