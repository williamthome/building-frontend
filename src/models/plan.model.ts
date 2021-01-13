export interface Plan {
  id: string
  name: string
  limit: PlanLimit
  value: PlanValue
}

type PlanLimitFields =
  | 'member'
  | 'customer'
  | 'property'
  | 'technician'
  | 'building'
  | 'phase'
  | 'project'
  | 'storageMb'

type PlanValueFields = 'BRL' | 'USD'

type PlanLimits = { [K in PlanLimitFields]: number }

type PlanValues = { [K in PlanValueFields]: number }

type PlanLimit = 'unlimited' | PlanLimits

type PlanValue = 'free' | PlanValues
