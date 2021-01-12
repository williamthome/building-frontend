<script lang="ts">
  import { navigateTo } from '../helpers'
</script>

<h1>Error! Page not found!</h1>
<button on:click="{() => navigateTo('/')}">Go to home</button>

<style>
  h1 {
    color: red;
  }
</style>
