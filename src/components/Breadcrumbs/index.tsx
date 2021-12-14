import MuiBreadcrumbs, { BreadcrumbsProps } from '@material-ui/core/Breadcrumbs'

import stylesBlock from 'utils/stylesBlock'

import Link from './components/Link'
import Text from './components/Text'
import { ReactComponent as SeparatorIcon } from './icons/separator.svg'

import styles from './breadcrumbs.module.scss'

interface IBreadcrumb {
  href?: string
  text: string
}

interface IProps {
  className?: string
  breadcrumbs: IBreadcrumb[]
}

const b = stylesBlock(styles)

const classes: BreadcrumbsProps['classes'] = {
  li: b('breadcrumb'),
}

const Breadcrumbs: React.FC<IProps> = ({ breadcrumbs, className }) => {
  return (
    <MuiBreadcrumbs 
      className={className}
      component='div'
      separator={<SeparatorIcon />}
      classes={classes}
    >
      { breadcrumbs.map(({ text, href }) => {
        if (href) {
          return (
            <Link 
              key={text}
              href={href} 
            >
              { text }
            </Link>
          )
        }
        return (
          <Text key={text}>
            { text }
          </Text>
        )
      })}
    </MuiBreadcrumbs>
  )
}

export default Breadcrumbs
