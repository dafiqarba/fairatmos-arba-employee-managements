import type { Employee } from '../../types'
import { capitalizeFirstLetter } from '../../utils'
import { Avatar, Tag } from '../../components/common'

type EmployeeTableProps = {
  data: Employee[]
  isLoading: boolean
}
type TableContentProps = EmployeeTableProps

const TableContent = (props: TableContentProps) => {
  const { data, isLoading } = props

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, r) => (
          <tr
            key={r}
            className="odd:bg-gray-100 even:bg-gray-50 border-b-2 border-gray-300 animate-pulse"
          >
            <td className="p-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-200" />
                <div className="h-3 w-40 rounded bg-gray-200" />
              </div>
            </td>
            <td className="p-2">
              <div className="h-3 w-16 rounded bg-gray-200" />
            </td>
            <td className="p-2">
              <div className="h-3 w-8 rounded bg-gray-200" />
            </td>
            <td className="p-2">
              <div className="flex gap-2">
                <div className="h-6 w-16 rounded bg-gray-200" />
                <div className="h-6 w-12 rounded bg-gray-200" />
              </div>
            </td>
            <td className="p-2">
              <div className="h-3 w-24 rounded bg-gray-200" />
            </td>
          </tr>
        ))}
      </>
    )
  }

  if (!isLoading && !data.length)
    return (
      <tr className="odd:bg-gray-100 even:bg-gray-50">
        <td colSpan={5} className="p-6 text-center text-slate-500">
          No employee data yet.
        </td>
      </tr>
    )

  return (
    <>
      {data.map((item, idx) => (
        <tr
          key={item.id ?? `${item.name}-${idx}`}
          className="odd:bg-gray-100 even:bg-gray-50 border-b-2 border-gray-300 text-stone-700 font-semibold text-md"
        >
          <td className="p-2 flex flex-row items-center h-full gap-2.5">
            <Avatar url={item.photo || ''} />
            {capitalizeFirstLetter(item.name)}
          </td>
          <td className="p-2">{capitalizeFirstLetter(item.gender)}</td>
          <td className="p-2">{item.age}</td>
          <td className="p-2">
            <div className="flex gap-1">
              {item.hobby.split(',').map((pillItem) => (
                <Tag key={pillItem} variant="pill" size="sm" text={pillItem} />
              ))}
            </div>
          </td>
          <td className="p-2">{capitalizeFirstLetter(item.department)}</td>
        </tr>
      ))}
    </>
  )
}

const EmployeeTable = (props: EmployeeTableProps) => {
  const { data, isLoading } = props

  return (
    <>
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full text-left text-xs">
          <thead className="bg-gray-200 text-slate-800 border-b-2 border-gray-300">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Age</th>
              <th className="p-3">Hobby</th>
              <th className="p-3">Department</th>
            </tr>
          </thead>
          <tbody>
            <TableContent data={data} isLoading={isLoading} />
          </tbody>
        </table>
      </div>
    </>
  )
}

export default EmployeeTable
