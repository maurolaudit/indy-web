import { Department } from './Department.type'
import { UserRole } from './UserRole.type'

export type User = {
  adminUserId: number
  id: number
  role: UserRole
  fullName: string
  firstName: string
  middleName: string
  lastName: string
  status: 'active' | 'inactive' | 'guest' | 'not_verified' | 'revoked' | 'deleted' | null
  email: string
  contactNumber: string
  gender: 'female' | 'male' | null
  birthDate: Date
  userType: {
    id: number
    type: string
    role: string
    departments: Array<Department>
  }
}
