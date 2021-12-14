import { ReactNode, useCallback } from 'react'

import Text from 'components/Text'
import Button from 'components/Button'
import useCart from 'hooks/useCart'
import stylesBlock from 'utils/stylesBlock'

import useVisibility from 'hooks/useVisibility'
import Product from './components/Product'
import EmptyCartErrorDialog from './components/EmptyCartErrorDialog'

import styles from './cart.module.scss'

const b = stylesBlock(styles)

interface IProps {
  className?: string
  bottom?: ReactNode
}

const Cart: React.FC<IProps> = ({ className, bottom }) => {

  const { visible: emptyDialogVisible, show: openErrorDialog, hide: closeErrorDialog } = useVisibility(false)

  const { 
    items, 
    hasItems,
    isModify,
    remove,
    clearCart,
  } = useCart()

  const onClearCartClick = useCallback(() => {
    if (isModify) {
      openErrorDialog()
      return
    }
    clearCart()
  }, [isModify, openErrorDialog, clearCart])

  const onRemove = useCallback((serviceId: number) => {
    if (isModify && items.length === 1) {
      openErrorDialog()
      return
    }
    remove(serviceId)
  }, [isModify, openErrorDialog, remove, items.length])

  if (!hasItems) return null

  return (
    <>
      <div className={b('container', className)}>
        <div className={styles.captionGroup}>
          <Text className={styles.caption}>
            Your service(s)
          </Text>
          <Button
            className={styles.clear}
            variant='text'
            onClick={onClearCartClick}
          >
            Clear
          </Button>
        </div>
        <div className={styles.productsWrapper}>
          {items.map((item, index) => (
            <Product
              key={item.service.id}
              index={index + 1}
              item={item}
              onRemoveClick={onRemove}
            />
          ))}
        </div>
        { bottom }
      </div>
      <EmptyCartErrorDialog
        open={emptyDialogVisible}
        onClose={closeErrorDialog}
      />
    </>
  )
}

export default Cart
