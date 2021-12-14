import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import IconButton from 'components/IconButton'
import Button from 'components/Button'

import styles from './closeButton.module.scss'

interface IProps {
  onClick: () => void
}

const CloseButton: React.FC<IProps> = ({ onClick }) => {
  return (
    <>
      <Button
        className={styles.itemInitial}
        variant='text'
        onClick={onClick}
      >
        Exit
      </Button>
      <IconButton 
        className={styles.itemMobile}
        onClick={onClick}
      >
        <ArrowBackIosIcon color='primary' fontSize='inherit' />
      </IconButton>
    </>
  )
}

export default CloseButton
