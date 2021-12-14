import React from 'react'
import { black, white } from 'core/theme/colors'
import BaseRating, { RatingProps } from '@material-ui/lab/Rating'
import Star from 'components/Svg/Star'
import useThemeName from 'hooks/useThemeName'
import { SMALL_SIZE, MEDIUM_SIZE, LARGE_SIZE } from './consts'

type TSizeVariant = 'small' | 'medium' | 'large'

interface IProps {
  size?: TSizeVariant
}

const sizeMap = {
  small: SMALL_SIZE,
  medium: MEDIUM_SIZE,
  large: LARGE_SIZE,
}

const Rating: React.FC<IProps & RatingProps> = ({ size = 'large', ...props }) => {
  const theme = useThemeName()

  const starColor = theme === 'light' ? black : white
  const starSize = sizeMap[size]
  
  return (
    <BaseRating
      icon={<Star opacity='1' width={starSize} height={starSize} color={starColor} />}
      emptyIcon={<Star width={starSize} height={starSize} color={starColor} />}
      {...props}
    />
  )
}

export default Rating
