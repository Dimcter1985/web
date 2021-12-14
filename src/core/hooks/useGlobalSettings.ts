import fetchGlobalSettings from 'core/api/settings/fetchGlobalSettings'
import { useEffect } from 'react'
import useApi from './useApi'

interface IUseGlobalSettings {
  settings: IGlobalSettings
  refresh: () => void
}

const defaultSettings = {
  referralDiscount: 7,
  serviceFee: 5,
}

const useGlobalSettings = (): IUseGlobalSettings => {
  const { data: settings, fetch } = useApi(fetchGlobalSettings)

  useEffect(() => {
    fetch()
  }, [])

  return { settings: settings || defaultSettings, refresh: fetch }
}

export default useGlobalSettings