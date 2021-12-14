import React from 'react'
import { ArrowProps } from 'react-multi-carousel/lib/types'

import ArrowRight from 'components/Svg/ArrowRight'
import { white } from 'core/theme/colors'
import Button from 'components/Button'
import stylesBlock from 'utils/stylesBlock'
import styles from './styles.module.scss'

const b = stylesBlock(styles)

interface IProps extends ArrowProps {
  side: 'left' | 'right'
}

const CustomArrow: React.FC<IProps> = ({ side, onClick }) => (
  <Button onClick={onClick} className={b('arrow', { side })}>
    <ArrowRight width='100%' height='100%' color={white} />
  </Button>
)

export default CustomArrow