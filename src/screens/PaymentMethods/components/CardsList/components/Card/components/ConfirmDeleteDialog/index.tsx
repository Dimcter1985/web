import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Dialog from 'components/Dialog/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from 'components/Dialog/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Text from 'components/Text'
import PureButton from 'components/PureButton'
import PaymentIcon from 'components/Svg/Cards/SmallIcon'
import CloseCross from '../CloseCross'
import styles from './ConfirmDeleteDialog.module.scss'

interface IProps {
  open: boolean;
  card: ICreditCard;
  onClose: () => void;
  onConfirm: () => void;
}

const b = stylesBlock(styles)

const ConfirmDeleteDialog: React.FC<IProps> = ({ open, card, onClose, onConfirm }) => {
  const { cardType ,last4 } = card

  return (
    <Dialog classes={{ paper: b('root') }} open={open} onClose={onClose}>
      <CloseCross className={b('close-button')} onClick={onClose} />
      <DialogTitle className={b('title')} disableTypography>Delete payment method</DialogTitle>
      <DialogContent className={b('content')}>
        <div className={b('info')}>
          <PaymentIcon type={cardType as unknown as ICreditCardType} />
          <Text className={b('card-text')}>
            { cardType } <b>****{ last4 }</b>
          </Text>
        </div>
        <DialogContentText className={b('text')}>
          If you do not want this payment method to be displayed in your list of payment 
          options, click "CONFIRM DELETE". (Disabling this payment method will not 
          cancel any of your open appointments that use this method.)
        </DialogContentText>
      </DialogContent>
      <DialogActions className={b('buttons')}>
        <PureButton className={b('button')} onClick={onClose}>Cancel</PureButton>
        <PureButton className={b('delete-button')} onClick={onConfirm}>Confirm delete</PureButton>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteDialog
