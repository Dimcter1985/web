import { useEffect, useCallback } from 'react'
import fetchFeaturedServices from 'core/api/services/fetchFeaturedServices'
import useApi from './useApi'

let cachedServices: IResponseWithTotal<IService> = {
  data: [],
  total: 0,
}

interface IUseFeaturedServices {
  services: IService[],
  refresh: () => void,
}

const useFeaturedServices = (): IUseFeaturedServices => {
  const { fetch, data } = useApi(fetchFeaturedServices, { initData: cachedServices })

  const load = useCallback(() => {
    fetch({ pagination: { page: 1, size: 100 } })
  }, [fetch])

  useEffect(() => { load() }, [load])

  useEffect(() => {
    if (data) { cachedServices = data }
  }, [data])

  return { services: data?.data || [], refresh: load }
}

export default useFeaturedServices