import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import useCreditCards from 'core/hooks/useCreditCards'
import Text from 'components/Text'
import Card from './components/Card'
import styles from './CardsList.module.scss'

const b = stylesBlock(styles)

const CardsList: React.FC = () => {
  const { cards, loaded, makePrimary, delayDeleteCard, removeCardFromList } = useCreditCards()

  if (!cards.length && loaded) {
    return (
      <Text className={b('empty-text')}>
        There are no credit cards in your account.
      </Text>
    )
  }

  return (
    <div className={b('container')}>
      <div className={b('list')}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            makePrimary={() => makePrimary(card.id)}
            deleteCard={() => delayDeleteCard(card.id)}
            removeCardFromList={() => removeCardFromList(card.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default CardsList
