import Button from 'components/Button'
import stylesBlock from 'utils/stylesBlock'

import { ReactComponent as ArrowIcon } from './icons/arrow_icon.svg'

import styles from './tabToggle.module.scss'

interface IProps {
  isOpen: boolean
  onClick: () => void
}

const b = stylesBlock(styles)

const TabToggle: React.FC<IProps> = ({ isOpen, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <Button 
        className={styles.button}
        variant='text'
        onClick={onClick}
      > 
        <span>Calendar</span>
        <ArrowIcon className={b('arrowIcon', { open: isOpen })} />
      </Button>
    </div>
  )
}

export default TabToggle
