<script lang="ts">
  import { NavItem, RouterLink, Authguard } from '.'
  import { user, currentPath } from '../store'
  import { routes } from '../config'
  import { deleteCookie } from '../helpers'

  async function logout() {
    deleteCookie('accessToken')
    $user = undefined
    routes['/login'].locked = false
    $currentPath = '/login'
  }
</script>

{#if $currentPath !== '/404'}
  <nav role="navigation">
    <ul class="brand">
      <RouterLink pagePath="{'/'}" />
    </ul>
    <ul class="links">
      <li>
        <Authguard>
          <li class="dropdown">
            <NavItem label="{$user.email}" />
            <ul class="dropdown-content">
              <li>
                <RouterLink pagePath="{'/profile'}" />
              </li>
              <li>
                <NavItem href="/logout" label="Logout" action="{logout}" />
              </li>
            </ul>
          </li>

          <ul slot="unauth">
            <li>
              <RouterLink pagePath="{'/register'}" />
            </li>
            <li>
              <RouterLink pagePath="{'/login'}" />
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
