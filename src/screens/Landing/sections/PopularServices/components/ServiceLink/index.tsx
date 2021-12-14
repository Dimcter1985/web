import Text from 'components/Text'
import RouterLink from 'components/RouterLink'

import styles from './serviceLink.module.scss'

interface IProps {
  imageSrc: string
  imageSrc2x: string
  name: string
}

const ServiceLink: React.FC<IProps> = ({ imageSrc, imageSrc2x, name }) => {
  return (
    <RouterLink 
      href={`/${name.toLowerCase()}`}
      className={styles.container}
    >
      <img
        className={styles.image}
        src={imageSrc}
        srcSet={`${imageSrc2x} 2x`}
        alt={name}
        loading='lazy'
      />
      <Text className={styles.name}>
        { name }
      </Text>
    </RouterLink>
  )
}

export default ServiceLink
