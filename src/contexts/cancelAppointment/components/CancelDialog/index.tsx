import React from 'react'
import ConfirmDialogWrapper from 'components/ConfirmDialog/ConfirmDialogWrapper'
import ConfirmDialogTitle from 'components/ConfirmDialog/ConfirmDialogTitle'
import ConfirmDialogContent from 'components/ConfirmDialog/ConfirmDialogContent'
import ConfirmDialogActions from 'components/ConfirmDialog/ConfirmDialogActions'
import ConfirmDialogButton from 'components/ConfirmDialog/ConfirmDialogButton'
import CancellationMessage from './components/CancellationMessage'

interface IProps {
  open: boolean;
  onClose: () => void;
  penaltyFee: number;
  onConfirm: () => void;
}

const CancelDialog: React.FC<IProps> = ({ open, onClose, onConfirm, penaltyFee}) => (
  <ConfirmDialogWrapper open={open} onClose={onClose}>
    <ConfirmDialogTitle>Cancel appointment?</ConfirmDialogTitle>
    <ConfirmDialogContent>
      <CancellationMessage penaltyFee={penaltyFee} />
      <br />
      <br />
      Do you still want to cancel your appointment?
    </ConfirmDialogContent>
    <ConfirmDialogActions>
      <ConfirmDialogButton onClick={onClose}>Keep my appointment</ConfirmDialogButton>
      <ConfirmDialogButton
        onClick={onConfirm}
        variant='outlined'
      >
        Cancel anyway
      </ConfirmDialogButton>
    </ConfirmDialogActions>
  </ConfirmDialogWrapper>
)

export default CancelDialog
