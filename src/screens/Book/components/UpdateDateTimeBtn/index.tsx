import Button from 'components/Button'

import styles from './updateDateTimeBtn.module.scss'

interface IProps {
  onClick: () => void
}

const UpdateDateTimeBtn: React.FC<IProps> = ({ onClick, children }) => {
  return (
    <Button 
      className={styles.item}
      variant='text'
      onClick={onClick}
    >
      { children }
    </Button>
  )
}

export default UpdateDateTimeBtn
