import { Dispatch, SetStateAction, useCallback, useState } from 'react'

import convertToFormErrors from 'core/utils/api/convertToFormErrors'

type ApiFunction<T> = (params: any) => Promise<T>

export interface IUseApi<T> {
  data: T | null
  loading: boolean
  loaded: boolean
  error: Error | null
  fetch: (params?: any) => any
  set: Dispatch<SetStateAction<T | null>>
}

interface IUseApiOptions<T> {
  onSuccess?: (data: T) => void
  onFailure?: (error: Error) => void
  initData?: T
}

function useApi<T>(
  api: ApiFunction<T>,
  { onSuccess, onFailure, initData }: IUseApiOptions<T> = {},
): IUseApi<T> {
  const [data, setData] = useState<T | null>(initData || null)
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetch = useCallback(async (params: Parameters<typeof api>) => {
    setLoading(true)
    try {
      const payload = await api(params)
      setData(payload)
      if (onSuccess) onSuccess(payload)
      setLoading(false)
      setLoaded(true)
    } catch (exception) {
      setLoading(false)
      setError(exception)
      if (onFailure) onFailure(exception)
      console.error(exception)
      return convertToFormErrors(exception)
    }
    return undefined
  }, [api, setData, error, setLoading, onSuccess, onFailure])

  return { data, loading, error, loaded, fetch, set: setData }
}

export default useApi
