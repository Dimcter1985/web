import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import CancellationPolicyText from 'components/CancellationPolicyText'

import Caption from '../Caption'
import styles from './CancellationPolicy.module.scss'

interface IProps {
  salonSettings: ISalonSettings;
}

const b = stylesBlock(styles)

const CancellationPolicy: React.FC<IProps> = ({ salonSettings }) => (
  <>
    <Caption>Cancellation policy</Caption>
    <CancellationPolicyText salonSettings={salonSettings} className={b('text')} />
  </>
)

export default CancellationPolicy
