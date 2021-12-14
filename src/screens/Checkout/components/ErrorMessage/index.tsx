import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Text from 'components/Text'
import ExclamationPoin from 'components/Svg/ExclamationPoint'
import styles from './ErrorMessage.module.scss'

const b = stylesBlock(styles)

const ErrorMessage: React.FC = () => (
  <div className={b('container')}>
    <ExclamationPoin className={b('icon')} width={24} height={24} />
    <Text className={b('text')}>
      Your payment couldn’t be authorized.<br />Please re-try your card again or use a different payment method.
    </Text>
  </div>
)

export default ErrorMessage
