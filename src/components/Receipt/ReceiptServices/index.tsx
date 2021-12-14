import React, { useCallback } from 'react'
import stylesBlock from 'utils/stylesBlock'
import Row from 'components/Row'
import Price from 'components/Price'
import { ICartItem, IChangeServiceQuantity } from 'contexts/cart/types'
import PureButton from 'components/PureButton'
import ReceiptCaption from '../ReceiptCaption'
import ReceiptTextAccent from '../ReceiptTextAccent'
import { ReactComponent as Minus } from './icons/minus.svg'
import { ReactComponent as Plus } from './icons/plus.svg'
import styles from './ReceiptSerives.module.scss'

interface IProps {
  items: ICartItem[];
  changeQuantity?: (payload: IChangeServiceQuantity) => void;
}

const b = stylesBlock(styles)

const AppointmentSerives: React.FC<IProps> = ({ items, changeQuantity }) => {

  const onQuantityChange = useCallback((serviceId: number, quantity: number, operation: 'inc' | 'dec') => {
    if (operation === 'dec' && quantity === 1) { return }

    if(operation === 'dec') {
      changeQuantity!({ serviceId, quantity: quantity - 1 })
      return
    }
    changeQuantity!({ serviceId, quantity: quantity + 1 })
  }, [changeQuantity])

  return (
    <>
      <Row className={styles.rowCaption}>
        <div className={styles.nameWrapper}>
          <ReceiptCaption>Service(s)</ReceiptCaption>
        </div>
        <Row className={styles.innerRow}>
          <ReceiptCaption>Qty</ReceiptCaption>
          <ReceiptCaption>Price</ReceiptCaption>
        </Row>
      </Row>
      <div className={styles.servicesWrapper}>
        { items.map(({ service, quantity }) => (
          <Row 
            key={service.id} 
            className={styles.rowItem}
          >
            <div className={styles.nameWrapper}>
              <ReceiptTextAccent className={styles.name}>
                { service.name }
              </ReceiptTextAccent>
            </div>
            <Row className={styles.innerRow}>
              <div className={b('quantityGroup', { alone: !changeQuantity })}>
                { !!changeQuantity &&
                  <PureButton
                    className={styles.button}
                    disabled={quantity <= 1}
                    onClick={() => onQuantityChange(service.id, quantity, 'dec')}
                  >
                    <Minus />
                  </PureButton>
                }
                  <ReceiptTextAccent className={styles.quantity}>
                  { quantity }
                </ReceiptTextAccent>
                { !!changeQuantity &&
                  <PureButton
                    className={styles.button}
                    onClick={() => onQuantityChange(service.id, quantity, 'inc')}
                  >
                    <Plus />
                  </PureButton>
                }
              </div>
              <Price 
                price={service.cost} 
                className={styles.price} 
              />
            </Row>
          </Row>
        ))}
      </div>
    </>
  )
}

export default AppointmentSerives
