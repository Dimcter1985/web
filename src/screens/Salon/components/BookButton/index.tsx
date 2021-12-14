import Button from 'components/Button'
import useCart from 'hooks/useCart'
import useBookDialog from 'screens/Salon/hooks/useBookDialog'
import stylesBlock from 'utils/stylesBlock'

import styles from './bookButton.module.scss'

interface IProps {
  className?: string
  disabled?: boolean
}

const b = stylesBlock(styles)

const BookButton: React.FC<IProps> = ({ className, disabled }) => {

  const { isModify } = useCart()
  const { openTimeDialog } = useBookDialog()

  return (
    <Button
      className={b('item', className)}
      size='large'
      onClick={openTimeDialog}
      disabled={disabled}
    >
      { isModify ? 'Modify' : 'Pick Date and time' }
    </Button>
  )
}

export default BookButton
