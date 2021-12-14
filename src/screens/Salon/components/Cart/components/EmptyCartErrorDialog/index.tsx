import ConfirmDialogActions from 'components/ConfirmDialog/ConfirmDialogActions'
import ConfirmDialogButton from 'components/ConfirmDialog/ConfirmDialogButton'
import ConfirmDialogContent from 'components/ConfirmDialog/ConfirmDialogContent'
import ConfirmDialogWrapper from 'components/ConfirmDialog/ConfirmDialogWrapper'

import styles from './emptyCartErrorDialog.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
}

const EmptyCartErrorDialog: React.FC<IProps> = ({ open, onClose }) => {
  return (
    <ConfirmDialogWrapper
      open={open}
      onClose={onClose}
    >
      <ConfirmDialogContent className={styles.content}>
        Oops! Your cart can’t be empty. <br />
        Please select your service(s) <br />
        Questions? <br />
        Email info@snailzapp.com
      </ConfirmDialogContent>
      <ConfirmDialogActions>
        <ConfirmDialogButton variant='outlined' onClick={onClose}>
          Got it
        </ConfirmDialogButton>
      </ConfirmDialogActions>
    </ConfirmDialogWrapper>
  )
}

export default EmptyCartErrorDialog
