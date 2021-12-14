import Text from 'components/Text'
import Link from 'components/Link'
import Price from 'components/Price'
import Row from 'components/Row'
import QuantityCounter from 'components/QuantityCounter'
import { ICartItem } from 'contexts/cart/types'
import useCart from 'hooks/useCart'

import styles from './product.module.scss'

interface IProps {
  index: number
  item: ICartItem,
  onRemoveClick: (serviceId: number) => void
}

const Product: React.FC<IProps> = ({ index, item, onRemoveClick }) => {

  const { changeQuantity } = useCart()

  const { service, quantity } = item
  const { id: serviceId, cost, name } = service

  const onUpdateQuantity = (value: number) => changeQuantity({ serviceId, quantity: value })
  const onRemove = () => onRemoveClick(serviceId)

  return (
    <div className={styles.container}>
      <Text className={styles.index}>{`${index}.`}</Text>
      <div className={styles.contentGroup}>
        <div className={styles.infoGroup}>
          <Text className={styles.name}>
            { name }
          </Text>
          <Price 
            price={cost} 
            className={styles.cost} 
          />
        </div>
        <Row>
          <QuantityCounter value={quantity} onChange={onUpdateQuantity} />
          <Link 
            className={styles.remove}
            component='button'
            onClick={onRemove}
          >
            Remove
          </Link>
        </Row>
      </div>
    </div>
  )
}

export default Product
