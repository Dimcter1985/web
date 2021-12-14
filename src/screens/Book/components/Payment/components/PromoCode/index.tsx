import React, { useState, useCallback, KeyboardEvent, ChangeEvent } from 'react'
import { useField } from 'react-final-form'
import stylesBlock from 'utils/stylesBlock'
import isEnterKey from 'utils/isEnterKey'
import calculatedDiscount from 'core/api/promo/calculatedDiscount'
import useCart from 'hooks/useCart'
import useCurrentSalon from 'hooks/useCurrentSalon'
import PureButton from 'components/PureButton'
import { TextInput } from 'components/Inputs/TextInput'
import Text from 'components/Text'
import Button from 'components/Button'
import ExclamationPoint from 'components/Svg/ExclamationPoint'
import styles from './PromoCode.module.scss'

const b = stylesBlock(styles)

const PromoCode: React.FC = () => {
  const { input: { value, onChange } } = useField<IDiscount>('discount')
  const { id } = useCurrentSalon()
  const [promoCode, setPromoCode] = useState('')
  const [error, setError] = useState(false)
  const { appointment, items } = useCart()

  const promoCodeChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError(false)
    setPromoCode(event.target.value)
  }, [setError, setPromoCode])
  
  const addPromoCode = useCallback(() => {
    calculatedDiscount({
      code: promoCode,
      salonId: id,
      services: items.map((item) => ({ serviceId: item.service.id, quantity: item.quantity })),
      appointmentId: appointment?.id,
    })
    .then((values) => {
      onChange({ id: values.id, code: values.code, amount: values.amount })
      setPromoCode('')
      setError(false)
    })
    .catch((_error) => {
      setError(true)
    })
  }, [promoCode, items, id, appointment])
  
  const onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (!isEnterKey(event) || promoCode.length === 0) { return }
    addPromoCode()
  }, [promoCode, addPromoCode])

  const removePromoCode = useCallback(() => {
    onChange(null)
  }, [onChange])

  return (
    <div className={b('container')}>
      <div className={b('input-line')}>
        <TextInput
          className={b('field-wrapper')}
          classes={{ root: b('field') }}
          value={promoCode}
          onChange={promoCodeChange}
          onKeyDown={onKeyDown}
          placeholder='ENTER PROMO CODE'
          inputProps={{ className: b('field-input') }}
          error={error}
        />
        { promoCode.length > 0 &&
          <Button
            className={b('apply-button')}
            onClick={addPromoCode}
          >
            Apply
          </Button>
        }
      </div>
      { error &&
        <div className={b('error')}>
          <ExclamationPoint width={24} height={24} />
          <Text className={b('error-text')}>
            Promo Сode is invalid
          </Text>
        </div>
      }
      { value.code &&
        <div className={b('code-line')}>
          <div className={b('code')}>
            { value.code }
          </div>
          <PureButton
            className={b('remove-button')}
            onClick={removePromoCode}
          >
            Remove
          </PureButton>
        </div>
      }
    </div>
  )
}

export default PromoCode
