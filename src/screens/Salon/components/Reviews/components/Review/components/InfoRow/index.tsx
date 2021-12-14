import stylesBlock from 'utils/stylesBlock'

import styles from './infoRow.module.scss'

interface IProps {
  hide?: boolean
}

const b = stylesBlock(styles)

const InfoRow: React.FC<IProps> = ({ hide = false, children }) => {
  return (
    <div className={b('container', { hide })}>
      { children }
    </div>
  )
}

export default InfoRow
