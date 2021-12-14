import { useCallback, useState, useEffect } from 'react'
import fetchGeolocations from 'core/api/fetchGeolocations'
import Link from 'components/Link'
import Text from 'components/Text'
import useGeolocation from 'core/hooks/useGeolocation'

import { ReactComponent as Icon } from './icons/icon.svg'

import styles from './location.module.scss'

const Location: React.FC = () => {

  const { fetchCurrectPosition, ready, location } = useGeolocation()
  const [locationName, setLocationName] = useState<string | null>(null)

  const onGetPositionClick = useCallback(() => {
    fetchCurrectPosition()
  }, [fetchCurrectPosition])

  useEffect(() => {
    if (!ready) { return }
    fetchGeolocations({ location })
      .then((res) => {
        const cityName = res.results[0].address_components[0].long_name || null
        setLocationName(cityName)
      })
      .catch(console.error)
  }, [ready])
  
  return (
    <div className={styles.container}>
      <Text className={styles.text}>
        { locationName && `It looks like you’re in ${locationName}. Not correct?`}
      </Text>
      <Link 
        className={styles.current}
        component='button'
        onClick={onGetPositionClick}
      >
        <Icon className={styles.currentIcon} />
        Get current location
      </Link>
    </div>
  )
}

export default Location
