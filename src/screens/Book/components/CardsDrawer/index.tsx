import React from 'react'
import useCreditCards from 'core/hooks/useCreditCards'
import RightDrawer from 'components/RightDrawer'
import Button from 'components/Button'
import Text from 'components/Text'
import Card from './components/Card'
import styles from './cardsDrawer.module.scss'

interface IProps {
  visible: boolean
  hide: () => void
  showAddCard: () => void
  selectedCardId: number | null
  onSelectCard: (id: number) => void
}

const CardsDrawer: React.FC<IProps> = ({
  visible,
  hide,
  showAddCard,
  selectedCardId,
  onSelectCard,
}) => {
  const { cards } = useCreditCards()

  return (
    <RightDrawer
      isOpen={visible}
      onClose={hide}
    >
      <div className={styles.header}>
        <Text className={styles.title}>Payment methods</Text>
        <Button
          onClick={hide}
          className={styles.closeBtn}
          variant='text'
        >
          close
        </Button>
      </div>
      { cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          isActive={card.id === selectedCardId}
          onClick={() => onSelectCard(card.id)}
        />
      ))}
      <Button
        className={styles.addCardBtn}
        onClick={showAddCard}
      >
        Add new card
      </Button>
    </RightDrawer>
  )
}

export default CardsDrawer
