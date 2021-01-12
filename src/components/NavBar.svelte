<script lang="ts">
  import { RouterLink, Authguard } from '.'
  import { user, currentPath } from '../store'
  import { deleteCookie, navigateTo } from '../helpers'

  async function logout() {
    deleteCookie('accessToken')
    $user = undefined
    navigateTo('/login')
  }
</script>

{#if $currentPath !== '/404'}
  <nav role="navigation">
    <ul class="brand">
      <li>
        <RouterLink to="{'/'}" label="Home" />
      </li>
    </ul>
    <ul class="links">
      <li>
        <Authguard>
          <li class="dropdown">
            <RouterLink label="{$user.email}" />
            <ul class="dropdown-content">
              <li>
                <RouterLink to="{'/profile'}" label="Profile" />
              </li>
              <li>
                <RouterLink label="Logout" onClick="{logout}" />
              </li>
            </ul>
          </li>

          <ul slot="unauth">
            <li>
              <RouterLink to="{'/register'}" label="Register" />
            </li>
            <li>
              <RouterLink to="{'/login'}" label="Login" />
            </li>
          </ul>
        </Authguard>
      </li>
    </ul>
  </nav>
{/if}

<style lang="scss">
  $background-color: white;

  nav {
    background-color: $background-color;
    display: flex;
  }

  ul {
    padding-inline-start: 0;
  }

  li {
    display: inline-block;
  }

  .brand {
    flex-grow: 1;
  }

  .links {
    display: flex;
  }

  .dropdown {
    &-content {
      background-color: $background-color;
      display: none;
      position: absolute;
      z-index: 1;

      & li {
        padding: 1rem;

        &:hover {
          background-color: rgb(215, 210, 223);
        }
      }
    }

    &:hover &-content {
      display: flex;
      flex-flow: column;
    }
  }
</style>
