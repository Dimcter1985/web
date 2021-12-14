import stylesBlock from 'utils/stylesBlock'
import useMediaQueries from 'hooks/useMediaQueries'
import useThemeName from 'hooks/useThemeName'
import { TextInput as TextField, IProps as ITextInputProps } from 'components/Inputs/TextInput'
import { ReactComponent as WhiteSearchIcon } from './icons/white_loupe.svg'
import { ReactComponent as BlackSearchIcon } from './icons/black_loupe.svg'
import ClearBtn from '../ClearBtn'

import styles from './textInput.module.scss'

interface IProps {
  className?: string
  hasSearch: boolean
  onClear: () => void
}

const b = stylesBlock(styles)

const inputProps = { className: b('input-field') }
const inputClasses = {
  notchedOutline: b('notched-outline'),
}

const TextInput: React.FC<IProps & ITextInputProps> = ({ hasSearch, onClear, className, ...props }) => {
  const { isSmallScreen } = useMediaQueries()
  const themeName = useThemeName()

  return (
    <TextField
      fullWidth
      InputProps={{
        classes: { root: b('input-root', className), ...inputClasses },
        inputProps,
        startAdornment: themeName === 'light'
          ? <BlackSearchIcon className={b('search-icon')} />
          : <WhiteSearchIcon className={b('search-icon')} />,
        endAdornment: hasSearch && !isSmallScreen ? <ClearBtn onClick={onClear} /> : null,
        autoComplete: 'new-password',
      }}
      {...props}
    />
  )
}

export default TextInput
