import React from 'react'
import ConfirmDialogWrapper from 'components/ConfirmDialog/ConfirmDialogWrapper'
import ConfirmDialogTitle from 'components/ConfirmDialog/ConfirmDialogTitle'
import ConfirmDialogContent from 'components/ConfirmDialog/ConfirmDialogContent'
import ConfirmDialogActions from 'components/ConfirmDialog/ConfirmDialogActions'
import ConfirmDialogButton from 'components/ConfirmDialog/ConfirmDialogButton'
import CancelledMessage from './components/CancelledMessage'

interface IProps {
  open: boolean;
  onClose: () => void;
  penaltyFee: number;
}

const ConfirmDialog: React.FC<IProps> = ({ open, onClose, penaltyFee}) => (
  <ConfirmDialogWrapper open={open} onClose={onClose}>
    <ConfirmDialogTitle>Appointment cancelled</ConfirmDialogTitle>
    <ConfirmDialogContent>
      <CancelledMessage penaltyFee={penaltyFee} />
      <br />
      <br />
      Do you still want to cancel your appointment?
    </ConfirmDialogContent>
    <ConfirmDialogActions>
      <ConfirmDialogButton onClick={onClose}>Ok</ConfirmDialogButton>
    </ConfirmDialogActions>
  </ConfirmDialogWrapper>
)

export default ConfirmDialog
