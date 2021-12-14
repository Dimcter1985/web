import Button from 'components/Button'

import styles from './moreBtn.module.scss'

interface IProps {
  visible: boolean
  onClick: () => void
}

const MoreBtn: React.FC<IProps> = ({ visible, onClick }) => {

  if (!visible) { 
    return null
  }

  return (
    <Button 
      className={styles.item}
      onClick={onClick}
    >
      Show all photos
    </Button>
  )
}

export default MoreBtn
