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
  name: string
  accessToken: string
  activeCompanyId: string
  verified: boolean
}
