import React from 'react'
import Price from 'components/Price'
import ReceiptContentGroup from '../ReceiptContentGroup'
import ReceiptCaption from '../ReceiptCaption'
import TotalRow from './components/TotalRow'
import styles from './ReceiptPrices.module.scss'

interface IProps {
  subtotal: number;
  discount?: number;
  credits?: number;
  tip: number;
  taxes: number;
  total: number;
  fees: number
}

const ReceiptPrices: React.FC<IProps> = ({ subtotal, discount, credits, tip, taxes, total, fees }) => (
  <ReceiptContentGroup>
    <TotalRow>
      <ReceiptCaption className={styles.totalTextItem}>Subtotal</ReceiptCaption>
      <Price price={subtotal} className={styles.finalPrice} />
    </TotalRow>
    { !!discount &&
      <TotalRow>
        <ReceiptCaption className={styles.totalTextItem}>Discount</ReceiptCaption>
        <Price price={discount} negative className={styles.finalPrice} />
      </TotalRow>
    }
    { !!credits &&
      <TotalRow>
        <ReceiptCaption className={styles.totalTextItem}>Credit</ReceiptCaption>
        <Price price={credits} negative className={styles.finalPrice} />
      </TotalRow>
    }
    <TotalRow>
      <ReceiptCaption className={styles.totalTextItem}>Tip</ReceiptCaption>
      <Price price={tip} className={styles.finalPrice} />
    </TotalRow>
    <TotalRow>
      <ReceiptCaption className={styles.totalTextItem}>Taxes and fees</ReceiptCaption>
      <Price price={taxes + fees} className={styles.finalPrice} />
    </TotalRow>
    <TotalRow>
      <ReceiptCaption className={`${styles.totalText} ${styles.totalTextItem}`}>
        Total
      </ReceiptCaption>
      <Price price={total} className={styles.totalPrice} />
    </TotalRow>
  </ReceiptContentGroup>
)

export default ReceiptPrices
