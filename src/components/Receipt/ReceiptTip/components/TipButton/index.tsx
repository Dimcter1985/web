import Button from 'components/Button'

import styles from './tipButton.module.scss'

interface IProps {
  active: boolean
  onClick: () => void
}

const TipButton: React.FC<IProps> = ({ 
  active, 
  onClick,
  children,
}) => {
  return (
    <Button 
      className={styles.item}
      variant={active ? 'contained' : 'outlined'}
      onClick={onClick}
    >
      { children }
    </Button>
  )
}

export default TipButton
