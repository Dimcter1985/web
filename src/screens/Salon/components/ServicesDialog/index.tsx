import CloseIcon from '@material-ui/icons/Close'

import Text from 'components/Text'
import IconButton from 'components/IconButton'
import Dialog from 'components/Dialog/Dialog'
import DialogContent from 'components/Dialog/DialogContent'
import useCart from 'hooks/useCart'
import useResizeHeight from 'hooks/useResizeHeight'
import stylesBlock from 'utils/stylesBlock'

import Cart from '../Cart'
import Services from '../Services'
import BookButton from '../BookButton'

import styles from './servicesDialog.module.scss'

interface IProps {
  visible: boolean
  onClose: () => void
}

const classes = { paper: styles.paper }
const b = stylesBlock(styles)

const ServicesDialog: React.FC<IProps> = ({ visible, onClose }) => {

  const { appointment, hasItems } = useCart()
  const isResized = useResizeHeight()

  return (
    <Dialog 
      open={visible}
      onClose={onClose}
      classes={classes}
      fullScreen
    >
      <DialogContent className={styles.content}>
        <div className={styles.headingGroup}>
          <IconButton
            className={styles.closeBtn}
            onClick={onClose}
          >
            <CloseIcon color='primary' />
          </IconButton>
          <Text className={styles.heading}>
            { `${appointment ? 'Modify' : 'Pick'} your service(s)` }
          </Text>
        </div>
        <div className={styles.cartWrapper}>
          <Cart className={styles.cart} />
        </div>
        <Services className={styles.services} classes={{ caption: styles.caption }} />
        <div className={b('bookButtonWrapper', { expanded: isResized })}>
          <BookButton className={styles.bookButton} disabled={!hasItems} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ServicesDialog
