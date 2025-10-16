export type Employee = {
  id?: string
  age: number
  name: string
  hobby: string
  photo?: string
  department: string
  gender: 'male' | 'female'
}

export type CreateEmployee = Omit<Employee, 'photo' | 'id'>

export interface CustomError extends Error {
  message: string
  cause: { status: number }
}

export type ReadEmployee = {
  data: Employee[]
  request_id: string
}
