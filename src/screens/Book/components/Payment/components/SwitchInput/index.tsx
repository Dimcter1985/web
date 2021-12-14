import React, { useCallback } from 'react'
import withInput from 'hocs/withInput'
import Switch, { SwitchProps } from '@material-ui/core/Switch'

interface IProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

type CustomSwitchProps = Omit<SwitchProps, 'onChange'>

const SwitchInput: React.FC<IProps & CustomSwitchProps> = ({ checked, onChange, disabled }) => {
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }, [onChange])
  
  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      disabled={disabled}
    />
  )
}

export { SwitchInput }
export default withInput(SwitchInput, { type: 'checkbox' })
