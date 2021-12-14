import React, { useCallback } from 'react'
import useCreditCards from 'core/hooks/useCreditCards'
import convertToFormErrors from 'core/utils/api/convertToFormErrors'
import RightDrawer from 'components/RightDrawer'
import AddCardForm from 'components/AddCardForm'
import { IValidFormValues } from './types'

interface IProps {
  visible: boolean
  hide: () => void
  onSucces: (id: number) => void
}

const AddCardDrawer: React.FC<IProps> = ({ visible, hide, onSucces }) => {
  const { createCard } = useCreditCards()

  const onCreateCard = useCallback(async (values: IValidFormValues) => {
    createCard({
      ...values,
      expirationDate: values.expirationDate?.format('MM/YY'),
    })
      .then((newCard) => {
        hide()
        onSucces(newCard.id)
      })
      .catch(convertToFormErrors)
  }, [hide, createCard, onSucces])

  return (
    <RightDrawer
      isOpen={visible}
      onClose={hide}
    >
      <AddCardForm onAdd={onCreateCard} onClose={hide} />
    </RightDrawer>
  )
}

export default AddCardDrawer
