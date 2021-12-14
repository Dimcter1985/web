import ConfirmDialogActions from 'components/ConfirmDialog/ConfirmDialogActions'
import ConfirmDialogButton from 'components/ConfirmDialog/ConfirmDialogButton'
import ConfirmDialogContent from 'components/ConfirmDialog/ConfirmDialogContent'
import ConfirmDialogWrapper from 'components/ConfirmDialog/ConfirmDialogWrapper'
import ConfirmDialogTitle from 'components/ConfirmDialog/ConfirmDialogTitle'

import styles from './confilrModifyDialog.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
  onSubmit: () => void
}

const ConfilrModifyDialog: React.FC<IProps> = ({ open, onClose, onSubmit }) => {
  return (
    <ConfirmDialogWrapper
      open={open}
      onClose={onClose}
    >
      <ConfirmDialogTitle>
        Modify your appointment?
      </ConfirmDialogTitle>
      <ConfirmDialogContent className={styles.content}>
        Please note that you are only able to modify 
        {' '}<b>the date, time and/or service(s).</b>{' '}
        <br className={styles.separator} />
        If you need to change the salon, please cancel 
        the appointment and make a new one.
      </ConfirmDialogContent>
      <ConfirmDialogActions>
        <ConfirmDialogButton onClick={onSubmit}>
          Modify appointment
        </ConfirmDialogButton>
        <ConfirmDialogButton variant='outlined' onClick={onClose}>
          Cancel
        </ConfirmDialogButton>
      </ConfirmDialogActions>
    </ConfirmDialogWrapper>
  )
}

export default ConfilrModifyDialog
