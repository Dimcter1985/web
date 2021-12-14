import React, { memo } from 'react'
import stylesBlock from 'utils/stylesBlock'
import Text from 'components/Text'
import Map from 'components/Map'
import useCart from 'hooks/useCart'
import useCurrentSalon from 'hooks/useCurrentSalon'
import { 
  SchemeItemTypes, 
  addressProp, 
  streetAddressProp,
  addressLocalityProp,
  addressRegionProp,
  postalCodeProp, 
} from 'consts/schemeOrg'

import Caption from '../Caption'
import { marker } from './icons/marker'

import styles from './addressMap.module.scss'

const b = stylesBlock(styles)

const AddressMap: React.FC = () => {
  const { hasItems } = useCart()

  const { 
    address,
    addressLine2,
    city,
    location,
    state,
    zipCode,
  } = useCurrentSalon()

  return (
    <>
      <Caption className={styles.caption}>Address</Caption>
      <Text 
        className={styles.address} 
        itemProp={addressProp}
        itemScope
        itemType={SchemeItemTypes.postalAddress}
      >
        <meta content={address} itemProp={streetAddressProp} />
        <meta content={city} itemProp={addressLocalityProp} />
        <meta content={state} itemProp={addressRegionProp} />
        <meta content={zipCode} itemProp={postalCodeProp} />
        <span>{ address }, { city }, { state } { zipCode }</span>
      </Text>
      { addressLine2 && (
        <Text className={styles.address} color='textSecondary'>
          { addressLine2 }
        </Text>
      )}
      <div className={b('map', { hasItems })}>
        <Map 
          location={location}
          marker={marker}
          defaultZoom={15}
        />
      </div>
    </>
  )
}

export default memo(AddressMap)
