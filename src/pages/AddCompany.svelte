<script lang="ts">
  import { onMount } from 'svelte'
  import { user, loading, plans } from '../store'
  import type { Company, CreateCompanyDto, Plan } from '../models'
  import { formDataToJSON, navigateTo } from '../helpers'

  onMount(async () => {
    if (!$plans) {
      $loading = true

      const api = (await import(/* webpackChunkName: "api" */ '../api')).default

      await api.fetch<undefined, Plan[]>({
        requestOpts: {
          method: 'GET',
          uri: '/plan'
        },
        onSuccess: async (allPlans) => {
          $plans = allPlans
        },
        onError: ({ error }) => {
          console.error(error)
          alert('Error! ' + error)
        }
      })

      $loading = false
    }
  })

  async function addCompany(event: Event) {
    $loading = true

    const form = event.target
    const dto = formDataToJSON<CreateCompanyDto>(form)

    const api = (await import(/* webpackChunkName: "api" */ '../api')).default

    await api.fetch<CreateCompanyDto, Company>({
      requestOpts: {
        method: 'POST',
        uri: '/company',
        body: dto
      },
      onSuccess: async (company) => {
        console.log('COMPANY CREATED', company)

        navigateTo('/')
      },
      onError: ({ error }) => {
        console.error(error)
        alert('Error! ' + error)
      }
    })

    $loading = false
  }
</script>

{#if $plans}
  <h1>Add Company page</h1>
  <form on:submit|preventDefault="{addCompany}">
    <div>
      <label for="name">Name</label>
      <input name="name" placeholder="Enter your company name" required />
    </div>
    <div>
      <label for="planId">Plan</label>
      <select name="planId">
        {#each $plans as { id, name }}
          <option value="{id}">{name}</option>
        {/each}
      </select>
    </div>
    <input type="submit" value="Create" />
  </form>
{/if}

<style lang="scss">
  h1 {
    color: purple;
  }
</style>
