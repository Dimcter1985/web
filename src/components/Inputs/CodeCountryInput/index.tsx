import React, { useCallback, useEffect } from 'react'
import stylesBlock from 'utils/stylesBlock'
import withInput from 'hocs/withInput'
import useThemeName from 'hooks/useThemeName'
import { ICountry, countries } from 'consts/countries'
import { white } from 'core/theme/colors'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField'
import OpenArrow from 'components/Svg/ArrowRight'
import styles from './CodeCountryInput.module.scss'

interface IProps {
  variant?: BaseTextFieldProps['variant']
  onChange: (value: string) => void
}

const b = stylesBlock(styles)

const classes = {
  endAdornment: b('open-icon'),
  noOptions: b('no-options'),
}

const CodeCountryInput: React.FC<IProps> = ({ variant = 'outlined', onChange, ...props }) => {
  const themeName = useThemeName()

  useEffect(() => onChange(countries[0].phoneCode), [])

  const handleChange = useCallback((_event: any, country: ICountry) => {
    onChange(country.phoneCode)
  }, [onChange])
  
  return (
    <Autocomplete
      classes={{ ...classes }}
      popupIcon={<OpenArrow color={themeName === 'dark' ? white : undefined} />}
      disableClearable
      defaultValue={countries[0]}
      onChange={handleChange}
      options={countries}
      getOptionLabel={(option): string => `${option.countryName} (+${option.phoneCode})`}
      renderInput={(params): React.ReactNode => (
        <TextField
          {...params}
          {...props}
          variant={variant}
        />
      )}
    />
  )
}

export { CodeCountryInput }
export default withInput(CodeCountryInput)
