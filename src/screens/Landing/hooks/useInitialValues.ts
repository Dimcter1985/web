import { useContext } from 'react'

import { Context } from 'screens/Landing/contexts/landing'

const useInitValues = () => {
  const {
    featuredSalons,
    topBookedSalons,
    featuredServices,
  } = useContext(Context)

  return {
    featuredSalons,
    topBookedSalons,
    featuredServices,
  }
}

export default useInitValues
