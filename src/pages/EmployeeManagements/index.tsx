import { toast } from 'react-toastify'
import { useEffect, useMemo, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { readEmployee } from '../../utils'
import EmployeeTable from './EmployeeTable'
import AddEmployeeModal from './AddEmployeeModal'
import { Button, Pagination } from '../../components/common'
import type { CustomError, Employee, ReadEmployee } from '../../types'

const PAGE_SIZE = 5

const EmployeeManagementsPage = () => {
  const [page, setPage] = useState(1)
  const [isModalOpen, setModalOpen] = useState(false)

  const queryClient = useQueryClient()

  const { data, error, isLoading } = useQuery<ReadEmployee, CustomError>({
    queryKey: ['employees'],
    queryFn: ({ signal }) => readEmployee(signal),
  })

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['employees'] })
  }

  const handleOpenModal = () => setModalOpen((prev) => !prev)

  const total = data?.data.length ?? 0
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))

  const start = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const end = total === 0 ? 0 : Math.min(page * PAGE_SIZE, total)

  const employeeData = useMemo<Employee[]>(() => {
    if (!data) return []
    const startIdx = (page - 1) * PAGE_SIZE
    return data.data
      .map((employee) => ({
        ...employee,
        gender: employee.gender as Employee['gender'],
      }))
      .slice(startIdx, startIdx + PAGE_SIZE)
  }, [data, page])

  // Clamp page when total changes (e.g., after add/remove/refetch)
  useEffect(() => {
    if (page > pageCount) setPage(pageCount)
    if (page < 1) setPage(1)
  }, [page, pageCount])

  useEffect(() => {
    if (error) {
      toast.error(`${error}`, { autoClose: 3000 })
    }
  }, [error])

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-2 sm:p-6 bg-gray-100 rounded-lg shadow-xs mt-8 mb-8">
      <div className="border-b-2 border-solid border-gray-300">
        <div className="flex flex-col gap-6 mb-4 sm:justify-between sm:items-center sm:flex-row">
          <div>
            <h1 className="text-2xl font-semibold text-stone-800">
              Employee Managements
            </h1>
            <p className="text-slate-500 text-sm font-semibold">
              Current roster of all active personnel and teams.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="primary" onClick={handleOpenModal}>
              Add New Employee
            </Button>
          </div>
        </div>
      </div>

      <p className="text-slate-500 text-xs mb-4">
        Displaying {start}-{end} of <b className="text-slate-800">{total}</b> Employees
      </p>

      <EmployeeTable data={employeeData} isLoading={isLoading && !data} />

      <Pagination page={page} pageSize={PAGE_SIZE} total={total} onPageChange={setPage} />

      <AddEmployeeModal
        open={isModalOpen}
        onCreated={handleRefresh}
        onClose={handleOpenModal}
      />
    </div>
  )
}

export default EmployeeManagementsPage
