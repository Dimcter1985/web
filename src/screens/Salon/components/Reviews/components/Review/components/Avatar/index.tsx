import { useState } from 'react'

import styles from './avatar.module.scss'

interface IProps {
  src?: string
  name: string
}

const Avatar: React.FC<IProps> = ({ src, name }) => {

  const [ failed, setFailed ] = useState<boolean>(false)

  const onError = () => setFailed(true)
  
  if (!src) {
    return (
      <div className={styles.dummy}>
        {`${name[0]}`}
      </div>
    )
  }

  if (failed) {
    return (
      <div className={styles.dummyFailed}>
        Failed to load
      </div>
    )
  }

  return (
    <img 
      className={styles.item} 
      src={src}
      alt={name} 
      onError={onError}
    />
  )
}

export default Avatar
