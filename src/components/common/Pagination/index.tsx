import { cn } from '../../../utils'

type PaginationProps = {
  page: number
  total: number
  pageSize: number
  onPageChange: (p: number) => void
}

const Pagination = (props: PaginationProps) => {
  const { page, pageSize, total, onPageChange } = props

  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const clamp = (p: number) => Math.min(pageCount, Math.max(1, p))

  // Build the list: numbers + "…" gaps
  const buildPages = (
    page: number,
    pageCount: number,
    around = 1, // pages to show around the current page
    edgeCount = 2 // pages to always show at the start and end
  ): Array<number | '…'> => {
    const ELLIPSIS: '…' = '…'
    const out: Array<number | '…'> = []

    const push = (n: number) => out.push(n)
    const pushGap = () => {
      if (out[out.length - 1] !== ELLIPSIS) out.push(ELLIPSIS)
    }

    for (let i = 1; i <= pageCount; i++) {
      const inLeadingEdge = i <= edgeCount
      const inTrailingEdge = i > pageCount - edgeCount
      const nearCurrent = Math.abs(i - page) <= around

      if (inLeadingEdge || inTrailingEdge || nearCurrent) {
        push(i)
      } else {
        pushGap()
      }
    }

    return out
  }

  const pages = buildPages(page, pageCount)

  return (
    <div className="mt-4 w-full flex justify-end">
      <nav className="flex items-center gap-1" aria-label="Pagination">
        <button
          type="button"
          disabled={page <= 1}
          aria-label="Previous page"
          onClick={() => onPageChange(clamp(page - 1))}
          className="rounded px-2 py-1 text-sm text-slate-500 border border-gray-400 disabled:opacity-50 cursor-pointer hover:bg-gray-300"
        >
          Previous
        </button>
        {pages.map((item, idx) => {
          const isGap = item === '…'

          if (isGap) {
            return (
              <span
                key={`gap-${idx}`}
                aria-hidden="true"
                className="px-2 text-sm text-slate-500 select-none"
              >
                …
              </span>
            )
          }

          const p = item as number
          const isActive = p === page

          return (
            <button
              type="button"
              key={`page-${p}`}
              onClick={() => onPageChange(p)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'rounded px-3 py-1 text-sm cursor-pointer',
                isActive
                  ? 'bg-slate-700 text-white'
                  : 'border border-gray-400 text-slate-500 hover:bg-gray-300'
              )}
            >
              {p}
            </button>
          )
        })}

        <button
          type="button"
          aria-label="Next page"
          disabled={page >= pageCount}
          onClick={() => onPageChange(clamp(page + 1))}
          className="rounded px-2 py-1 text-sm text-slate-500 border border-gray-400 disabled:opacity-50 cursor-pointer hover:bg-gray-300"
        >
          Next
        </button>
      </nav>
    </div>
  )
}

export default Pagination
