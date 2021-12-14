import stylesBlock from 'utils/stylesBlock'
import useCart from 'hooks/useCart'

import AddressMap from '../AddressMap'
import Cart from '../Cart'
import BookNowCta from '../BookNowCta'
import Nearby from '../Nearby'
import BookButton from '../BookButton'

import styles from './asideRight.module.scss'

const b = stylesBlock(styles)

const AsideRight: React.FC = () => {

  const { hasItems } = useCart()

  return (
    <>
      <Cart bottom={<BookButton className={styles.bookButton} />} />
      <div className={b('mapBookGroup', { 'cart': hasItems })}>
        <AddressMap />
        <BookNowCta className={b('book-now-button')} />
      </div>
      <Nearby />
    </>
  )
}

export default AsideRight
