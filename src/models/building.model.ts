export interface Building {
  id: string
  title: string
  companyId: string
}

export type CreateBuildingDto = Pick<Building, 'title'>
