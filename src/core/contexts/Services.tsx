import React, { createContext, useState, useCallback, useEffect } from 'react'
import flatten from 'lodash/flatten'

import fetchCategories from 'core/api/categories/fetchCategories'

const Services = createContext({} as IServicesContext)

const ServicesProvider: React.FC = ({ children }) => {
  const [coreCategories, setCoreCategories] = useState<IListCategory[]>([])
  const [coreServices, setCoreServices] = useState<ICommonService[]>([])
  const [loading, setLoading] = useState(false)

  const extractServices = useCallback((data: IListCategory[]) => (
    flatten(data.map(({ services }) => services))
  ), [])

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await fetchCategories()
      const services = extractServices(data)
      setCoreCategories(data)
      setCoreServices(services)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      return null
    }
  }, [fetchCategories, extractServices])

  const refreshServices = useCallback(async () => {
    await fetchServices()
  }, [fetchServices])

  useEffect(() => { refreshServices() }, [])

  return (
    <Services.Provider value={{
        categories: coreCategories,
        services: coreServices,
        fetchServices,
        loaded: !loading,
      }}
    >
      {children}
    </Services.Provider>
  )
}

export { ServicesProvider }

export default Services