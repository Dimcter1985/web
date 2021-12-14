import BaseText, { IProps } from 'components/Text'

import styles from './text.module.scss'

const Text: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <BaseText 
      className={styles.item} 
      { ...props }
    >
      { children }
    </BaseText>
  )
}

export default Text
