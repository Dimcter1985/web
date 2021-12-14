import { useCallback } from 'react'

import PureButton from 'components/PureButton'
import Row from 'components/Row'
import Text from 'components/Text'
import Price from 'components/Price'
import Divider from 'components/Divider'

import { ReactComponent as PlusIcon }  from './icons/plus.svg'

import styles from './service.module.scss'

interface IProps {
  service: ISalonService
  onAddClick: (service: ICustomService) => void
}

const Service: React.FC<IProps> = ({ service, onAddClick }) => {

  const {
    id: serviceId,
    name,
    cost,
    description,
  } = service

  const onClick = useCallback(() => {
    onAddClick({ id: serviceId, name, cost })
  }, [service, onAddClick])

  return (
    <PureButton className={styles.wrapper} onClick={onClick}>
      <Row className={styles.container}>
        <div className={styles.infoGroup}>
          <Text className={styles.name}>{ name }</Text>
          <Text className={styles.description}>{ description }</Text>
        </div>
        <Price price={cost} className={styles.price} />
        <div className={styles.iconWrapper}>
          <PlusIcon className={styles.icon} />
        </div>
      </Row>
      <Divider className={styles.divider} />
    </PureButton>
  )
}

export default Service
