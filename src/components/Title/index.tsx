import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Typography, { TypographyProps } from '@material-ui/core/Typography'
import styles from './Title.module.scss'

interface IProps extends TypographyProps {
  positions?: 'center' | 'left' | 'right';
  size?: 'small' | 'large';
}

const b = stylesBlock(styles)

const Title: React.FC<IProps> = ({ className, positions = 'center', size = 'large', ...props }) => (
  <Typography className={b('title', { positions, size }, className)} {...props} />
)

export default Title
