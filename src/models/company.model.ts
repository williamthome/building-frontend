import type { Building } from './building.model'

export interface Company {
  id: string
  name: string
  members: Member[]
  buildings?: Building[]
}

export type CreateCompanyDto = Pick<Company, 'name'>

export interface Member {
  userId: string
  companyRole: CompanyRole
  features: UserFeatures
}

export enum CompanyRole {
  owner = 0,
  master = 1,
  user = 2
}

export enum UserFeatures {
  None = 0,
  ManageBuildings = 1 << 0,
  ManageProjects = 1 << 1,
  ManageUsers = 1 << 2,
  ManageCompanyData = 1 << 3,
  ManagePhases = 1 << 4,
  ManageCustomers = 1 << 5,
  ManageProperties = 1 << 6,
  ManageTechnicians = 1 << 7
}
