import React from 'react'
import useMediaQueries from 'hooks/useMediaQueries'

interface IProps {
  mobile?: boolean;
  tablet?: boolean;
  medium?: boolean;
  large?: boolean;
}

const VisibleOn: React.FC<IProps> = ({
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

  const match = isMobile || isTablet || isMedium || isLarge

  if (!match) return null

  return <>{children}</>
}

export default VisibleOn
