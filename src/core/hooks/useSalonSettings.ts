import { useEffect } from 'react'
import fetchSalonSettings from 'core/api/salons/fetchSalonSettings'
import useApi from './useApi'

interface IUseSalonsSettingsParams {
  salonId: number | number
}

const useSalonSettings = ({ salonId }: IUseSalonsSettingsParams): { settings: ISalonSettings | null } => {
  const { fetch, data } = useApi<ISalonSettings>(fetchSalonSettings)

  useEffect(() => {
    fetch({ salonId })
  }, [fetch, salonId])

  return { settings: salonId ? data : null }
}

export default useSalonSettings
