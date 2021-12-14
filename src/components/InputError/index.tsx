import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Text from 'components/Text'
import ExclamationPoin from 'components/Svg/ExclamationPoint'
import styles from './InputError.module.scss'

interface IClasses {
  root?: string
  text?: string
  icon?: string
}

type TSizeVariant = 'normal' | 'large'

const sizeMap = {
  normal: 16,
  large: 24,
} 

interface IProps {
  classes?: IClasses
  size?: TSizeVariant
}

const b = stylesBlock(styles)

const InputError: React.FC<IProps> = ({ classes, size = 'normal', children }) => {
  const iconSize = sizeMap[size]
  
  return (
    <div className={b('wrapper', classes?.root)}>
      <div className={b('icon-wrapper', { size }, classes?.icon)}>
        <ExclamationPoin width={iconSize} height={iconSize} />
      </div>
      <Text className={b('text', classes?.text)}>{ children }</Text>
    </div>
  )
}

export default InputError
