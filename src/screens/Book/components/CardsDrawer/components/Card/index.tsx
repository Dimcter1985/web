import React, { useMemo } from 'react'
import noop from 'lodash/noop'
import stylesBlock from 'utils/stylesBlock'
import checkNotExpiredCard from 'utils/checkNotExpiredCard'
import Text from 'components/Text'
import PureButton from 'components/PureButton'
import PaymentIcon from 'components/Svg/Cards/BigIcon'
import useCart from 'hooks/useCart'
import styles from './card.module.scss'

interface IProps {
  isActive: boolean
  card: IListCreditCard
  onClick: () => void
}

const cls = stylesBlock(styles)

const Card: React.FC<IProps> = ({ isActive, card, onClick }) => {
  const { startsAtInTZ } = useCart()
  const { default: primary, last4, cardType, expiresAt } = card

  const valid = useMemo(() => checkNotExpiredCard(startsAtInTZ!, expiresAt), [startsAtInTZ, expiresAt])

  return (
    <PureButton
      className={cls('container', { expired: !valid })}
      onClick={valid ? onClick : noop}
    >
      <div className={cls('iconWrapper', { primary })}>
        <PaymentIcon type={cardType as unknown as ICreditCardType} />
        { primary && <Text className={styles.primary}>Primary</Text> }
      </div>
      <div className={styles.infoWrapper}>
        <Text className={cls('text', { primary: true } )}>
          { `${cardType} ****${ last4 }` }
        </Text>
        <Text className={cls('text', { secondary: true, expired: !valid } )}>
          Expires: { expiresAt.replace('-', '/') }
        </Text>
      </div>
      { valid &&
        <div className={styles.radioWrapper}>
          <div className={cls('radioIcon', { active: isActive })} />
        </div>
      }
    </PureButton>
  )
}

export default Card
