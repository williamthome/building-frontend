<script lang="ts">
  import { onDestroy } from 'svelte'

  let seconds = 0
  const interval = setInterval(() => {
    seconds = seconds + 1
  }, 1000)

  onDestroy(() => {
    clearInterval(interval)
  })
</script>

<h1>This is Home page</h1>
<p>It's been running for {seconds} seconds</p>

<style>
  h1 {
    color: rgb(75, 155, 99);
  }
</style>
