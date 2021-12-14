import RouterLink from 'components/RouterLink'
import Button from 'components/Button'
import { ButtonProps } from '@material-ui/core/Button'
import useHover from 'hooks/useHover'
import styles from './navItem.module.scss'

interface IProps {
  href: string
  variant?: ButtonProps['variant']
  className?: string;
}

const NavItem: React.FC<IProps> = ({ href, variant = 'contained', className, children }) => {
  const [ forwardedRef ] = useHover<HTMLAnchorElement>()

  return (
    <RouterLink 
      href={href}
      className={styles.container}
      forwardRef={forwardedRef}
    >
      <Button 
        className={className}
        size='large'
        variant={variant}
      >
        { children }
      </Button>
    </RouterLink>
  )
}

export default NavItem
