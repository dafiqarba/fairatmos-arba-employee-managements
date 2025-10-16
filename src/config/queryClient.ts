import { QueryClient } from '@tanstack/react-query'

import type { CustomError } from '../types'

const shouldRetry = (failureCount: number, error: Error) => {
  const status = (error as unknown as CustomError)?.cause.status ?? 500

  // never retry as they won’t succeed by retrying
  if (
    status === 403 || 
    status === 401 || 
    status === 404 
  )
    return false

  // allow at most ONE retry for transient network errors
  return failureCount < 1
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // don’t refetch on tab focus / reconnect / mount (prevents surprise hits)
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retryOnMount: false,

      // retry logic: at most 1, and never for rate-limit/forbidden/notfound
      retry: shouldRetry,
      retryDelay: (attempt) => Math.min(1000 * attempt, 3000),

      staleTime: 5 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
      refetchInterval: false,
      // avoid network errors bubbling during fast nav
      networkMode: 'online',
    },
  },
})

export default queryClient
