import { useCallback, useEffect, useState } from 'react'

import useMediaQueries from 'hooks/useMediaQueries'
import stylesBlock from 'utils/stylesBlock'

import styles from './mediahelper.module.scss'

interface IProps {
  showOffset?: boolean
}

const b = stylesBlock(styles)

const MediaHelper: React.FC<IProps> = ({ showOffset }) => {

  const { isLarge, isMedium, isTablet, isMobile, isSmallScreen } = useMediaQueries()
  const [ offsetValue, setOffsetValue ] = useState<number>(0)

  const scrollHandler = useCallback(() => {
    setOffsetValue(window.pageYOffset)
  }, [])

  useEffect(() => {
    if (!showOffset) { return }
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  return (
    <div className={b('container')}>
      { showOffset && <p>{ offsetValue }</p>}
      { isLarge && <p>large</p> }
      { isMedium && <p>medium</p> }
      { isTablet && <p>tablet</p> }
      { isMobile && <p>mobile</p> }
      { isSmallScreen && <p>small screen</p> }
    </div>
  )
}

export default MediaHelper
