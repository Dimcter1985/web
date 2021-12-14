import React from 'react'
import withInput from 'hocs/withInput'
import stylesBlock from 'utils/stylesBlock'

import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from 'components/FormHelperText'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import OpenArrow from './componets/OpenArrow'

import styles from './SelectInput.module.scss'

type Value = string | number

interface ISelectItem {
  label: string;
  value: Value;
}

interface IProps {
  className?: string;
  items: ISelectItem[];
  blankText?: string;
  helperText?: TextFieldProps['helperText'];
  error?: TextFieldProps['error'];
  SelectProps?: TextFieldProps['SelectProps']
}

const b = stylesBlock(styles)

const SelectInput: React.FC<IProps & TextFieldProps> = ({
  className,
  items,
  blankText,
  helperText,
  error,
  variant = 'outlined',
  SelectProps,
  ...props
}) => (
  <TextField
    variant={variant}
    select
    SelectProps={{
      IconComponent: OpenArrow,
      classes: { iconFilled: b('icon-filled'), iconOutlined: b('icon-outlined') },
      ...SelectProps,
    }}
    error={error}
    helperText={<FormHelperText variant={variant} error={error}>{ helperText }</FormHelperText>}
    {...props}
  >
    { blankText && <MenuItem key='0' value=''>{ blankText }</MenuItem> }
    { items.map((item: ISelectItem, index) => (
      <MenuItem
        key={(index + 1).toString()}
        value={item.value}
      >
        { item.label }
      </MenuItem>
    ))}
  </TextField>
)

export { SelectInput }
export default withInput(SelectInput)
