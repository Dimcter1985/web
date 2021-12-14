import CircularProgress from '@material-ui/core/CircularProgress'

import styles from './loader.module.scss'

const Loader: React.FC = () => {
  return (
    <div className={styles.item}>
      <CircularProgress />
    </div>
  )
}

export default Loader
