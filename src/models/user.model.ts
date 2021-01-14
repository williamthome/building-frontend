import type { Building } from './building.model'
import type { Company, CompanyRole, UserFeatures } from './company.model'

export interface Authentication {
  email: string
  password: string
}

export interface Registration {
  email: string
  password: string
  passwordConfirmation: string
}

export interface User {
  id: string
  email: string
  verified: boolean
  name?: string
  accessToken?: string
  activeCompanyId?: Company['id']
  rights?: UserRights[]
  lastActiveCompany?: Company
  lastActiveBuilding?: Building
}

export interface UserRights {
  company: Company
  role: CompanyRole
  features: UserFeatures
}
