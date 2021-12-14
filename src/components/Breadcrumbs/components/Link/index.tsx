import RouterLink, { IProps } from 'components/RouterLink'

import styles from './link.module.scss'

const Link: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <RouterLink 
      className={styles.item} 
      { ...props }
    >
      { children }
    </RouterLink>
  )
}

export default Link
