import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import useAppointmentStatuses from 'hooks/useAppointmentStatuses'
import HiddenOn from 'components/HiddenOn'
import RouterLink from 'components/RouterLink'
import Button from 'components/Button'
import styles from './Actions.module.scss'

interface IProps {
  appointment: IListAppointment;
  onRebook: () => void;
  onModify: () => void;
  onUpdatePayments: () => void;
}

const b = stylesBlock(styles)

const Actions: React.FC<IProps> = ({ appointment, onRebook, onModify, onUpdatePayments }) => {
  const { withPaymentFaild, canModifyServices, canModify, canRebook } = useAppointmentStatuses({ appointment })

  return (
    <div className={b('buttons-group')}>
      <HiddenOn tablet mobile>
        <RouterLink
          className={b('button')}
          href={
            canRebook
              ? '/account/past'
              : '/account/upcoming'
          }
        >
          <Button className={b('back-button')} variant='outlined'>Back</Button>
        </RouterLink>
      </HiddenOn>
      { withPaymentFaild &&
        <Button className={b('button', { withFaild: true })} onClick={onUpdatePayments}>Update payment</Button>
      }
      { canModifyServices &&
        <Button className={b('button')} onClick={() => {}}>Modify services</Button>
      }
      { canModify &&
        <Button className={b('button')} onClick={onModify}>Modify</Button>
      }
      { canRebook && !appointment.salon.nonSnailz &&
        <Button className={b('button')} onClick={onRebook}>Rebook</Button>
      }
    </div>
  )
}

export default Actions
