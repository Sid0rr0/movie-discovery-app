'use client'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (newPage: number) => void
  isFetching?: boolean
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  isFetching = false,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-4 my-4">
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1 || isFetching}
        className="px-4 py-2 bg-gray-600 rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span className="px-4 py-2">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page < totalPages ? page + 1 : page)}
        disabled={page === totalPages || isFetching}
        className="px-4 py-2 bg-gray-600 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}
