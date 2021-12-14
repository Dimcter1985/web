import stylesBlock from 'utils/stylesBlock'
import Text from 'components/Text'
import styles from './StaticPageSubtitle.module.scss'

interface IProps {
  variant?: string
}

const b = stylesBlock(styles)

const StaticPageSubtitle: React.FC<IProps> = ({children, variant}) => {
  return (
    <Text className={b('subtitle', {variant})}>{children}</Text>
  )
}

export default StaticPageSubtitle