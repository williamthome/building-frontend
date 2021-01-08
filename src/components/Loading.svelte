<script lang="ts">
  import { loading } from '../store'
</script>

{#if $loading}
  <div></div>
{/if}

<style lang="scss">
  div {
    z-index: 9999;

    &:not([hidden]) {
      position: fixed;
      width: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.7);
    }

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 5rem;
      height: 5rem;
      border-radius: 100%;
      border: 0.2rem solid #f3f3f3;
      border-top: 0.3rem solid #f25a41;
      will-change: transform;
      animation: spin 1s infinite linear;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
