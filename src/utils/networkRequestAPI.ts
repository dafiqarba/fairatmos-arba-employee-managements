import type { CreateEmployee, Employee, ReadEmployee } from '../types'

const BASE = import.meta.env.VITE_API_BASE_URL || ''
const SIGNATURE = import.meta.env.VITE_SIGNATURE || ''

const headers = {
  Signature: SIGNATURE,
  'Content-Type': 'application/json',
}

export const readEmployee = async (signal?: AbortSignal): Promise<ReadEmployee> => {
  const res = await fetch(`${BASE}`, { signal, headers })
  if (!res.ok) {
    const errJson = await res.json()

    throw new Error(errJson.message || 'Request failed', {
      cause: { status: res.status },
    })
  }

  return res.json()
}

export const createEmployee = async (payload: CreateEmployee): Promise<Employee> => {
  const res = await fetch(`${BASE}`, {
    headers,
    method: 'POST',
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const errJson = await res.json()

    throw new Error(errJson.message || 'Request failed', {
      cause: { status: res.status },
    })
  }

  return res.json()
}
