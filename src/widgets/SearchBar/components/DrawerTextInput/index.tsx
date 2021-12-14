import { TextInput as TextField, IProps as ITextInputProps } from 'components/Inputs/TextInput'
import stylesBlock from 'utils/stylesBlock'
import useThemeName from 'hooks/useThemeName'

import { ReactComponent as BlackSearchIcon } from './icons/black_loupe.svg'
import { ReactComponent as WhiteSearchIcon } from './icons/white_loupe.svg'
import ClearBtn from '../ClearBtn'

import styles from './drawerTextInput.module.scss'

interface IProps {
  hasSearch: boolean
  onClear: () => void
}

const b = stylesBlock(styles)

const inputProps = { className: b('input-field') }
const inputClasses = {
  notchedOutline: b('notched-outline'),
}

const DrawerTextInput: React.FC<IProps & ITextInputProps> = ({ hasSearch, onClear, ...props }) => {
  const themeName = useThemeName()

  return (
    <TextField
      fullWidth
      InputProps={{
        classes: { root: b('input-root', { theme: themeName }), ...inputClasses },
        inputProps,
        startAdornment: themeName === 'light'
          ? <BlackSearchIcon className={b('search-icon')} />
          : <WhiteSearchIcon className={b('search-icon')} />,
        endAdornment: hasSearch ? <ClearBtn onClick={onClear} /> : null,
        autoComplete: 'new-password',
      }}
      {...props}
    />
  )
}

export default DrawerTextInput
