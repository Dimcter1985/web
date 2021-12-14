import React, { useMemo } from 'react'
import stylesBlock from 'utils/stylesBlock'
import useCart from 'hooks/useCart'
import useServicesDialog from 'screens/Salon/hooks/useServicesDialog'
import Link from 'components/Link'
import Text from 'components/Text'
import { ReactComponent as MoreIcon } from './icons/more_arrow.svg'
import styles from './ServiceList.module.scss'

const b = stylesBlock(styles)

const MAX_RECORD = 3

const ServiceList: React.FC = () => {
  const { openServicesDialog } = useServicesDialog()
  const { items, totalItems } = useCart()

  const recordsLenght = totalItems > MAX_RECORD ? MAX_RECORD : totalItems
  
  const records = useMemo(() => {
    if (!recordsLenght) { return [] }

    return items.slice(0, recordsLenght)
  }, [items, recordsLenght])

  const moreMax = totalItems > MAX_RECORD

  return (
    <Link
      className={b('servicesBtn')}
      component='button'
      onClick={openServicesDialog}
    >
      <div className={b('list')}>
        { 
          records.map((record, index) =>(
            <div key={index.toString()} className={b('record')}>
              <Text className={b('name')}>&#8729;{ ` ${record.service.name}` }</Text>
              <Text className={b('quantity')}>{ `(${record.quantity})` }</Text>
            </div>
          ))
        }
        { moreMax &&
          <div className={b('more-wrapper')}>
            <MoreIcon />
          </div>
        }
      </div>
    </Link>
  )
}

export default ServiceList
