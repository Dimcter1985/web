import React, { useCallback } from 'react'

import Button from 'components/Button'
import Text from 'components/Text'
import HiddenOn from 'components/HiddenOn'
import VisibleOn from 'components/VisibleOn'
import useCart from 'hooks/useCart'
import useCurrentSalon from 'hooks/useCurrentSalon'
import useScrollOffset from 'hooks/useScrollOffset'
import useMediaQueries from 'hooks/useMediaQueries'
import getSalonAddressInfo from 'utils/getSalonAddressInfo'
import stylesBlock from 'utils/stylesBlock'
import useApp from 'core/hooks/useApp'
import useAuthDialog from 'hooks/useAuthDialog'
import useServicesDialog from 'screens/Salon/hooks/useServicesDialog'
import useBookDialog from 'screens/Salon/hooks/useBookDialog'
import useFooterReached from 'hooks/useFooterReached'
import ServiceList from '../ServiceList'

import { ReactComponent as StarIcon } from './icons/star.svg'
import styles from './fixedInfo.module.scss'

const b = stylesBlock(styles)

const SCROLL_TOGGLE = 700

const formatRating = (value?: number | null) => value ? value.toFixed(1) : 0

const FixedInfo: React.FC = () => {
  const { isSmallScreen } = useMediaQueries()
  const salon = useCurrentSalon()
  const { hasItems } = useCart()
  const achived = useScrollOffset(SCROLL_TOGGLE)
  const { isLogged } = useApp()
  const { show: showAuth } = useAuthDialog()
  const { openServicesDialog } = useServicesDialog()
  const { openTimeDialog } = useBookDialog()
  const visible = useFooterReached()

  const address = getSalonAddressInfo(salon)
  const rating = formatRating(salon.averageRating)

  const onBookNowClick = useCallback(() => {
    if (isLogged) {
      openServicesDialog()
    } else {
      showAuth()
    }
  }, [isLogged, openServicesDialog, showAuth])

  return (
    <div className={b('outer', { visible: (achived || isSmallScreen) && visible })}>
      <div className={styles.container}>
        <div className={styles.content}>
          {hasItems ? (
            <>
              <ServiceList />
              <Button
                className={styles.button}
                onClick={openTimeDialog}
              >
                Pick date & time
              </Button>
            </>
          ) : (
            <>
              <Text className={styles.text}>
                <Text className={styles.name} variant='caption'>
                  { salon.name }
                </Text>
                <HiddenOn tablet mobile>
                  <Text className={styles.address} variant='caption'>
                    { address }
                  </Text>
                </HiddenOn>
                <VisibleOn tablet mobile>
                  <div className={styles.ratingGroup}>
                    <StarIcon />
                    <Text className={styles.rating}>
                      { rating }
                    </Text>
                  </div>
                </VisibleOn>
              </Text>
              <Button
                className={styles.button}
                onClick={onBookNowClick}
              >
                Book now
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default FixedInfo
