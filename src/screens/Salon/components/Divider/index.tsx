import BaseDivider, { IProps } from 'components/Divider'
import stylesBlock from 'utils/stylesBlock'

import styles from './divider.module.scss'

const b = stylesBlock(styles)

const Divider: React.FC<IProps> = () => {
  return (
    <BaseDivider className={b('item')} />
  )
}

export default Divider
