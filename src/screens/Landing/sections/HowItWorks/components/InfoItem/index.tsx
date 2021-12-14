import { ReactNode } from 'react'

import Text from 'components/Text'

import styles from './infoItem.module.scss'

interface IProps {
  caption: string
  text: ReactNode
}

const InfoItem: React.FC<IProps> = ({ caption, text }) => {
  return (
    <div className={styles.container}>
      <Text 
        className={styles.caption}
        color='textSecondary'
      >
        { caption }
      </Text>
      <Text 
        className={styles.text}
        color='textSecondary'
      >
        { text }
      </Text>
    </div>
  )
}

export default InfoItem
