import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import useAppointmentStatuses from 'hooks/useAppointmentStatuses'
import ActionsButton from './components/ActionsButton'
import styles from './AppointmentActions.module.scss'


interface IProps {
  appointment: IListAppointment;
  onRebook: () => void;
  onModify: () => void;
  onCancel: () => void;
}

const b = stylesBlock(styles)

const AppointmentActions: React.FC<IProps> = ({ appointment, onRebook, onCancel, onModify }) => {
  const { id, review, salon: { nonSnailz } } = appointment
  const { withPaymentFaild, canModifyServices, canModify, canRebook } = useAppointmentStatuses({ appointment })

  return (
    <div className={b('buttons')}>
      { withPaymentFaild &&
        <ActionsButton
          classes={{ root: b('pending-button') }}
          href={`upcoming/${id}/checkout`}
          fullWidth
        >
          Update payment
        </ActionsButton>
      }
      { canModifyServices &&
        <ActionsButton
          color='secondary'
          fullWidth
        >
          Modify services
        </ActionsButton>
      }
      { canModify &&
        <>
          <ActionsButton
            className={b('button')}
            color='secondary'
            fullWidth
            onClick={onModify}
          >
            Modify
          </ActionsButton>
          <ActionsButton
            className={b('button')}
            onClick={onCancel}
            variant='outlined'
            fullWidth
          >
            Cancel
          </ActionsButton>
        </>
      }
      { canRebook &&
        <>
          { !nonSnailz &&
            <ActionsButton
              className={b('button')}
              onClick={onRebook}
              color='secondary'
              fullWidth
            >
              Rebook
            </ActionsButton>
          }
          <ActionsButton
            className={b('button')}
            href={`/account/past/${id}/review`}
            variant='outlined'
            fullWidth
          >
            { !review ? 'Review' : 'Reviewed' }
          </ActionsButton>
        </>
      }
    </div>
  )
}

export default AppointmentActions
