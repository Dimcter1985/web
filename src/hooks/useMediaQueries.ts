import useMediaQuery from '@material-ui/core/useMediaQuery'

interface IUseMediaQueries {
  isMobile: boolean
  isTablet: boolean
  isMedium: boolean
  isLarge: boolean
  isSmallScreen: boolean
}

interface IProps {
  mobile?: boolean;
  tablet?: boolean;
  medium?: boolean;
  large?: boolean;
}

const useMediaQueries = ({
  mobile = true,
  tablet = true,
  medium = true,
  large = true,
}: IProps = {}): IUseMediaQueries => {
  const isMobile = useMediaQuery('(max-width: 600px)') && mobile
  const isTablet = useMediaQuery('(min-width: 601px) and (max-width: 960px)') && tablet
  const isMedium = useMediaQuery('(min-width: 961px) and (max-width: 1280px)') && medium
  const isLarge = useMediaQuery('(min-width: 1281px)') && large

  const isSmallScreen = isMobile || isTablet

  return {
    isMobile,
    isTablet,
    isMedium,
    isLarge,
    isSmallScreen,
  }
}

export default useMediaQueries