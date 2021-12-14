import React, { useEffect, useCallback } from 'react'
import stylesBlock from 'utils/stylesBlock'
import withInput from 'hocs/withInput'
import { useTheme } from '@material-ui/core/styles'
import Text from 'components/Text'
import Divider from 'components/Divider'
import { black } from 'core/theme/colors'
import styles from './YesNoInput.module.scss'

interface IProps {
  label?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  containerClassName?: string;
  labelClassName?: string;
  readOnly?: boolean;
}

const b = stylesBlock(styles)

const YesNoInput: React.FC<IProps> = ({
  label,
  value,
  onChange,
  containerClassName,
  labelClassName,
  readOnly,
}) => {
  const theme = useTheme()

  useEffect(() => {
    if (value) {
      onChange(true)
    }
  }, [value, onChange])

  const onYesClick = useCallback(() => {
    if (readOnly) { return }
    onChange(true)
  }, [onChange])

  const onNoClick = useCallback(() => {
    if (readOnly) { return }
    onChange(false)
  }, [onChange])

  return (
    <div className={b('content', containerClassName)}>
      <Text className={b('label', labelClassName)}>
        { label }
      </Text>
      <Text className={b('button', { active: value })} onClick={onYesClick}>Yes</Text>
      <Divider
        className={b('separator', { color: theme.palette.primary.main === black ? 'black' : 'white' })}
        orientation='vertical'
        flexItem
      />
      <Text
        className={b('button', { active: !value })}
        onClick={onNoClick}
      >
        No
      </Text>
    </div>
  )
}

export { YesNoInput }
export default withInput(YesNoInput)
