import { useMemo, useEffect, useCallback } from 'react'
import { useField } from 'react-final-form'

import Row from 'components/Row'
import Text from 'components/Text'
import Button from 'components/Button'
import useCreditCards from 'core/hooks/useCreditCards'
import useCart from 'hooks/useCart'
import checkNotExpiredCard from 'utils/checkNotExpiredCard'

import PaymentIcon from 'components/Svg/Cards/SmallIcon'
import ReceiptContentGroup from 'components/Receipt/ReceiptContentGroup'
import ReceiptCaption from 'components/Receipt/ReceiptCaption'
import ReceiptActionButton from 'components/Receipt/ReceiptActionButton'
import ReceiptError from 'components/Receipt/ReceiptError'
import useReceipt from 'screens/Book/hooks/useReceipt'
import IconWraper from './components/IconWraper'
import SwitchInput from './components/SwitchInput'
import PromoCode from './components/PromoCode'
import { ReactComponent as LogoIcon } from './icons/logo.svg'

import styles from './payment.module.scss'

interface IProps {
  showAddCard: () => void
  showCardsDrawer: () => void
}

const Payment: React.FC<IProps> = ({
  showAddCard,
  showCardsDrawer,
}) => {
  const {
    input: { onChange: onCardIdChange, value: selectedCardId },
    meta: { touched, invalid },
  } = useField<number>('cardId')

  const { balance } = useReceipt()

  const { startsAtInTZ } = useCart()
  const { cards, loading, loaded, defaultCard } = useCreditCards()
  const error = touched && invalid
  
  const selectedCard = useMemo(() => (
    cards.find(card => card.id === selectedCardId)
  ), [selectedCardId, cards])

  useEffect(() => {
    if (loading || !loaded || selectedCard) { return }
    showAddCard()
  }, [loading, loaded, showAddCard, selectedCard])

  const getValidCardId = useCallback(() => {
    if (selectedCard && checkNotExpiredCard(startsAtInTZ!, selectedCard.expiresAt)) {
      return selectedCard.id
    }
    if (defaultCard && checkNotExpiredCard(startsAtInTZ!, defaultCard.expiresAt)) {
      return defaultCard.id
    }
    const card = cards.find((c) => (checkNotExpiredCard(startsAtInTZ!, c.expiresAt)))
    if (card) { return card.id }
    return null
  }, [cards, defaultCard, startsAtInTZ, selectedCard])

  useEffect(() => {
    onCardIdChange(getValidCardId())
  }, [getValidCardId, onCardIdChange, startsAtInTZ])

  if (loading) {
    return (
      <ReceiptContentGroup className={styles.group}>
        <ReceiptCaption className={styles.caption}>Payment method</ReceiptCaption>
        <Text>Loading...</Text>
      </ReceiptContentGroup>
    )
  }

  return (
    <>
      <ReceiptContentGroup className={styles.group}>
        <ReceiptCaption className={styles.caption}>Payment method</ReceiptCaption>
        { selectedCard ? 
          <Row className={styles.primaryCartRow}>
            <div className={styles.primaryCartGroup}>
              <IconWraper>
                <PaymentIcon type={selectedCard.cardType as unknown as ICreditCardType} />
              </IconWraper>
              <Text className={styles.cartInfo}>
                { selectedCard.cardType }<b>{ ` ****${selectedCard.last4}` }</b>
              </Text>
            </div>
            <Button
              className={styles.changeCartBtn}
              variant='text'
              onClick={showCardsDrawer}
            >
              Change
            </Button>
          </Row>
          :
          <Row className={styles.primaryCartRow}>
            <ReceiptActionButton onClick={showAddCard}>Add card</ReceiptActionButton>
          </Row>
        }
        { error &&
          <ReceiptError classes={{ root: styles.errorRoot, icon: styles.errorIcon }}>
            Please add payment method to proceed. Your credit card will be charged at the beginning of your appointment time.
          </ReceiptError>
        }
      </ReceiptContentGroup>
      <ReceiptContentGroup>
        <ReceiptCaption className={styles.caption}>Ohter payment options</ReceiptCaption>
        <Row className={styles.primaryCartRow}>
          <div className={styles.primaryCartGroup}>
            <IconWraper>
              <LogoIcon />
            </IconWraper>
            <Text className={styles.creditText} variant='caption'>
              { `Credit $${balance}` }
            </Text>
          </div>
          <SwitchInput
            name='usingCredit'
            disabled={!balance}
          />
        </Row>
        <PromoCode />
      </ReceiptContentGroup>
    </>
  )
}

export default Payment
