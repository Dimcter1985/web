import React from 'react'
import useMediaQueries from 'hooks/useMediaQueries'

interface IProps {
  mobile?: boolean;
  tablet?: boolean;
  medium?: boolean;
  large?: boolean;
}

const HiddenOn: React.FC<IProps> = ({
  children,
  mobile = false,
  tablet = false,
  medium = false,
  large = false,
}) => {
  const {
    isMobile,
    isTablet,
    isMedium,
    isLarge,
  } = useMediaQueries({
    mobile,
    tablet,
    medium,
    large,
  })

  if (isMobile || isTablet || isMedium || isLarge) return null

  return <>{children}</>
}

export default HiddenOn
