import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Text from 'components/Text'
import { CANCELLATION_FEE_TYPE_CASH } from 'core/consts'
import { DEFAULT_TEXT } from './consts'
import styles from './CancellationPolicyText.module.scss'

interface IProps {
  salonSettings: ISalonSettings;
  className?: string;
}

const b = stylesBlock(styles)

const getValueFromType = (type: FeeType, value: number): string => {
  if (type === CANCELLATION_FEE_TYPE_CASH) { return `$${value}` }

  return `${value}%`
}

const CancellationPolicyText: React.FC<IProps> = ({ salonSettings, className }) => {
  const {
    cancelationFee,
    cancelationFeePeriod,
    cancelationFeeType,
    noShowFee,
    noShowFeeType,
  } = salonSettings

  return (
    <>
      <Text className={b('text', className)}>
        { cancelationFee 
        ? (`Cancellations within ${cancelationFeePeriod} 
            minutes of the appointment time will incur a 
            ${getValueFromType(cancelationFeeType, cancelationFee)} fee
          `)
        : (`${DEFAULT_TEXT}`)
        }
      </Text>
      { !!noShowFee &&
        <Text className={b('text', className)}>
          { `No shows will incur a ${getValueFromType(noShowFeeType, noShowFee)}` }
        </Text>
      }
    </>
  )
}

export default CancellationPolicyText
