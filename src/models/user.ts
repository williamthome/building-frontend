import type { Company, CompanyRole, UserFeatures } from "./company";

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
  activeCompanyId?: string
  rights?: UserRights[]
}

export interface UserRights {
  company: Company
  role: CompanyRole
  features: UserFeatures
}
