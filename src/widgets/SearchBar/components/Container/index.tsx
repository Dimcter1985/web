import stylesBlock from 'utils/stylesBlock'
import { makeStyles, createStyles } from '@material-ui//core/styles'

import styles from './container.module.scss'

interface IProps {
  className?: string
}

const b = stylesBlock(styles)

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      border: `1.5px solid ${theme.palette.primary.main}`,
    },
  }),
)

const Container: React.FC<IProps> = ({ className, children }) => {
  const classes = useStyles()
  
  return (
    <div className={b('сontainer', classes.root, className)}>
      { children }
    </div>
  )
}

export default Container
