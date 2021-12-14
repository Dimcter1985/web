import React from 'react'
import getSalonAddress from 'utils/getSalonAddress'
import ReceiptContentGroup from '../ReceiptContentGroup'
import ReceiptCaption from '../ReceiptCaption'
import ReceiptTextAccent from '../ReceiptTextAccent'
import styles from './ReceiptSalonInfo.module.scss'

interface IProps {
  salon: ISalon
}

const ReceiptSalonInfo: React.FC<IProps> = ({ salon }) => (
  <ReceiptContentGroup>
    <div className={styles.row}>
      <div className={styles.nameColumn}>
        <ReceiptCaption className={styles.caption}>
          Salon
        </ReceiptCaption>
        <ReceiptTextAccent>{ salon.name }</ReceiptTextAccent>
      </div>
      <div>
        <ReceiptCaption className={styles.caption}>
          Address
        </ReceiptCaption>
        <ReceiptTextAccent>{getSalonAddress(salon)}</ReceiptTextAccent>
      </div>
    </div>
  </ReceiptContentGroup>
)

export default ReceiptSalonInfo
