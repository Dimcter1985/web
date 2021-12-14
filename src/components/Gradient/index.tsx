import React, { CSSProperties } from 'react'

import { pink, white } from 'core/theme/colors'
import block from 'utils/stylesBlock'
import styles from './Gradient.module.scss'

const b = block(styles)

interface IProps {
  firstColor?: string
  secondColor?: string
  position?: 'top' | 'center' | 'bottom' | 'left' | 'right'
  className?: string
}

const Gradient: React.FC<IProps> = ({
  children,
  className,
  firstColor = pink,
  secondColor = white,
  position = 'center',
}) => (
  <div
    style={{ '--first-color': firstColor, '--second-color': secondColor } as CSSProperties}
    className={b('gradient', { position }, className)}
  >
    {children}
  </div>
)

export default Gradient
