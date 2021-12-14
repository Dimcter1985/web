import { ReactNode } from 'react'
import VisibleOn from 'components/VisibleOn'
import Divider from 'components/Divider'
import styles from './contentLayout.module.scss'

interface IProps {
  asideRight: ReactNode
}

const ContentLayout: React.FC<IProps> = ({ asideRight, children }) => (
  <div className={styles.container}>
    <VisibleOn mobile>
      <Divider className={styles.divider} />
    </VisibleOn>
    <div className={styles.content}>
      { children }
    </div>
    <div className={styles.asideRight}>
      { asideRight }
    </div>
  </div>
)

export default ContentLayout
