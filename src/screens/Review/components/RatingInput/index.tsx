import React, { useCallback } from 'react'
import withInput from 'hocs/withInput'
import stylesBlock from 'utils/stylesBlock'
import { RatingProps } from '@material-ui/lab/Rating'
import Rating from 'components/Rating'
import Text from 'components/Text'
import Star from 'components/Svg/Star'
import FormHelperText from 'components/FormHelperText'
import styles from './RatingInput.module.scss'

interface IProps {
  value: number;
  onChange: (value: number | null) => void;
  label?: string;
  helperText?: string;
  error?: boolean;
}

const b = stylesBlock(styles)

const RatingInput: React.FC<IProps & RatingProps> = ({
  value,
  onChange,
  label,
  helperText,
  error,
  ...props
}) => {
  const handleChange = useCallback((_event: any, newValue: number | null) => {
    onChange(newValue)
  }, [onChange])

  return (
    <div className={b('rating')}>
      { label && <Text className={b('label')}>{ label }</Text> }
      <Rating
        value={value}
        onChange={handleChange}
        emptyIcon={<Star />}
        icon={<Star opacity='1' />}
        classes={{ icon: b('icon') }}
        {...props}
      />
      <FormHelperText error={error} variant='filled'>{ helperText }</FormHelperText>
    </div>
  )
}

export { RatingInput }
export default withInput(RatingInput)
