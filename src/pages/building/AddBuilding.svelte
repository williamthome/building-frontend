<script lang="ts">
  import { loading, user } from '@/store'
  import type { Building, CreateBuildingDto } from '@/models'
  import { formDataToJSON, navigateTo } from '@/helpers'

  async function addBuilding(event: Event) {
    $loading = true

    const form = event.target
    const dto = formDataToJSON<CreateBuildingDto>(form!)

    const api = (await import(/* webpackChunkName: "api" */ '@/api')).default

    await api.fetch<CreateBuildingDto, Building>({
      requestOpts: {
        method: 'POST',
        uri: '/building',
        body: dto
      },
      onSuccess: async (building) => {
        // navigateTo('/company/:companyId/building/:id', {
        //   companyId:
        //   id: building.id
        // })
        console.log('CREATED', { building })

        if ($user?.lastActiveCompany) {
          if (!$user!.lastActiveCompany!.buildings) $user!.lastActiveCompany!.buildings = []
          $user!.lastActiveCompany!.buildings!.push(building)
        }

        navigateTo('/company/:id', {
          id: building.companyId
        })
      },
      onError: ({ error }) => {
        console.error(error)
        alert('Error! ' + error)
      }
    })

    $loading = false
  }
</script>

<h1>Add Building page</h1>
<form on:submit|preventDefault="{addBuilding}">
  <div>
    <label for="title">Title</label>
    <input name="title" placeholder="Enter your building title" required />
  </div>
  <input type="submit" value="Create" />
</form>

<style lang="scss">
  h1 {
    color: purple;
  }
</style>
