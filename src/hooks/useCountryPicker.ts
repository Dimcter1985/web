import { useCallback, useEffect, useState } from 'react'
import { getCountries, getCountryCallingCode } from 'react-phone-number-input'
import localeEN from 'react-phone-number-input/locale/en.json'

interface ICountry {
  label: string
  code: string
  callingCode: string
  formatted: string
}

interface IUseCountryPicker {
  country?: ICountry
  countries: ICountry[]
  selectOptions: any[]
  setCountry: (country: ICountry) => void
  pickerVisible: boolean
  togglePicker: () => void
}

const DEFAULT_COUNTRY_CODE = 'US'

const useCountryPicker = (): IUseCountryPicker => {
  const [countries, setCounties] = useState<ICountry[]>([])
  const [country, setCountry] = useState<ICountry>()
  const [selectOptions, setSelectOptions] = useState<any[]>([])
  const [pickerVisible, setPickerVisible] = useState(false)

  const togglePicker = useCallback(() => {
    setPickerVisible(visible => !visible)
  }, [])

  const setDefaultCountry = useCallback(async () => {
    const data = getCountries()
    const countriesData = data.map(code => {
      const callingCode = getCountryCallingCode(code)
      const label = (localeEN as any)[code]
      return { label, code, callingCode, formatted: `${label} (+${callingCode})` }
    })
    const optionsData = data.map((code) => {
      const value = getCountryCallingCode(code)
      const label = `${(localeEN as any)[code]} (+${value})`
      return { label, value }
    })
    const defaultCountry = countriesData.find(({ code }) => (
      code === DEFAULT_COUNTRY_CODE
    ))
    setCountry(defaultCountry)
    setCounties(countriesData)
    setSelectOptions(optionsData)
  }, [getCountries, setCountry])

  useEffect(() => {
    setDefaultCountry()
  }, [])

  return {
    country,
    countries,
    selectOptions,
    setCountry,
    pickerVisible,
    togglePicker,
  }
}

export default useCountryPicker