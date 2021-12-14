import Row from 'components/Row'

import styles from './totalRow.module.scss'

const TotalRow: React.FC = ({ children }) => {
  return (
    <Row className={styles.item}>
      { children }
    </Row>
  )
}

export default TotalRow
