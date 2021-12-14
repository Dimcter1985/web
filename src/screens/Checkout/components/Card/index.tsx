import React from 'react'
import { Moment } from 'moment'
import stylesBlock from 'utils/stylesBlock'
import PureButton from 'components/PureButton'
import Text from 'components/Text'
import PaymentIcon from 'components/Svg/Cards/SmallIcon'
import checkNotExpiredCard from 'utils/checkNotExpiredCard'
import styles from './Card.module.scss'

interface IProps {
  card: ICreditCard;
  isProblem: boolean;
  isActive: boolean;
  onClick: () => void;
  today: Moment;
}

const b = stylesBlock(styles)

const Card: React.FC<IProps> = ({ card, isProblem, isActive, onClick, today }) => {
  const isValid = checkNotExpiredCard(today, card.expiresAt)

  return (
    <PureButton
      key={card.id}
      className={b('card', { notValid: !isValid })}
      onClick={() => isValid ? onClick() : undefined}
    >
      <div className={b('icon')}>
        <PaymentIcon type={card.cardType as unknown as ICreditCardType} />
      </div>
      <div className={b('info')}>
        <Text className={b('text')}>
          { card.cardType } ****<b>{ card.last4 }</b>
        </Text>
        <div className={b('problems')}>
          { isProblem &&
            <Text className={b('problem-text', { issue: true })}><i>* Issue with payment</i></Text>
          }
          { !isValid && <Text className={b('problem-text', { expired: true })}>Expired</Text> }
        </div>
      </div>
      { isValid &&
        <div className={b('radio-wrapper')}>
          <div className={b('radio-icon', { isActive })} />
        </div>
      }
    </PureButton>
  )
}

export default Card
