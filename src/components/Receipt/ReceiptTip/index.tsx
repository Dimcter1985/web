import React, { useEffect, useState, useCallback } from 'react'
import { useField } from 'react-final-form'
import withInput from 'hocs/withInput'

import { IOption } from 'types/option'
import { MIN_TIPS_SUBTOTAL } from 'core/consts'

import Row from 'components/Row'
import Text from 'components/Text'
import stylesBlock from 'utils/stylesBlock'
import ReceiptCaption from '../ReceiptCaption'
import ReceiptError from '../ReceiptError'
import TipButton from './components/TipButton'

import styles from './ReceiptTip.module.scss'

interface IProps {
  value: number;
  onChange: (value: number) => void
  tipping: boolean;
  subtotal: number;
}

const b = stylesBlock(styles)

const cashOption: IOption<number> = { id: 3, name: 'Cash' }

const aboveOptions: IOption<number>[] = [
  { id: 0, name: '20%' },
  { id: 1, name: '25%' },
  { id: 2, name: '30%' },
  cashOption,
]
const underOptions: IOption<number>[] = [
  { id: 0, name: '$3' },
  { id: 1, name: '$4' },
  { id: 2, name: '$5' },
  cashOption,
]

const ReceiptTip: React.FC<IProps> = ({ value, onChange, tipping, subtotal }) => {
  const { meta: { touched, invalid }} = useField('tipIndex')
  const [isMore, setIsMore] = useState<boolean>(false)
  const options = isMore ? aboveOptions : underOptions
  const onClick = useCallback((tip: number) => onChange(tip), [onChange])
  const error = touched && invalid

  useEffect(() => {
    setIsMore(subtotal > MIN_TIPS_SUBTOTAL)
  }, [subtotal])

  return (
    <>
      <ReceiptCaption className={styles.caption}>
        Tip amount
      </ReceiptCaption>
      {
        tipping
        ?
        <>
          { error &&
            <ReceiptError classes={{ root: styles.errorRoot }}>Please, select tip amount.</ReceiptError>
          }
          <Row>
            { options.map(({ id, name }) => (
              <TipButton 
                key={id}
                active={value === id}
                onClick={() => onClick(id)}
              >
                { name }
              </TipButton>
            ))}
          </Row>
        </>
        :
        <Row><Text className={b('text')}>Please tip appropriately in the salon. Thank you.</Text></Row>
      }
    </>
  )
}

export { ReceiptTip }
export default withInput(ReceiptTip)
