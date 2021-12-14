import React, { useCallback } from 'react'
import stylesBlock from 'utils/stylesBlock'
import withUserGuard from 'hocs/withUserGuard'
import { CreditCardsProvider } from 'core/contexts/CreditCards'
import useVisibility from 'hooks/useVisibility'
import useCreditCards from 'core/hooks/useCreditCards'
import convertToFormErrors from 'core/utils/api/convertToFormErrors'
import AccountLayout from 'components/Account/AccountLayout'
import AccountNavigation from 'components/Account/AccountNavigation'
import Text from 'components/Text'
import AccountButton from 'components/Account/AccountButton'
import RightDrawer from 'components/RightDrawer'
import AddCardForm from 'components/AddCardForm'
import BlackTheme from 'components/BlackTheme'
import CardsList from './components/CardsList'
import styles from './PaymentMethods.module.scss'

const b = stylesBlock(styles)

const PaymentMethods: React.FC = () => {
  const { createCard } = useCreditCards()
  const { visible, show, hide } = useVisibility(false)

  const onAddCardClick = useCallback(() => show(), [show])
  const onCreateCard = useCallback((values: any) => {
    createCard({
      ...values,
      expirationDate: values.expirationDate.format('MM/YY'),
    })
    .catch(convertToFormErrors)
    .finally(() => hide())
  }, [hide])

  return (
    <AccountLayout >
      <AccountNavigation activeItem='payment' />
      <Text className={b('header')} variant='h6'>Payment methods</Text>
      <CardsList />
      <AccountButton 
        className={b('add-card-btn')}
        onClick={onAddCardClick}
      >
        Add new card
      </AccountButton>
      <BlackTheme>
        <RightDrawer
          isOpen={visible}
          onClose={hide}
        >
          <AddCardForm onAdd={onCreateCard} onClose={hide} />
        </RightDrawer>
      </BlackTheme>
    </AccountLayout>
  )
}

const ConnectedCreditCards = () => (
  <CreditCardsProvider>
    <PaymentMethods />
  </CreditCardsProvider>
)

export default withUserGuard(ConnectedCreditCards)
