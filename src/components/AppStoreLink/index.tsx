import { APP_STORE_URL } from 'core/consts'
import ExternalLink from 'components/ExternalLink'
import stylesBlock from 'utils/stylesBlock'

import appStore1x from './images/app_store@1x.png'
import appStore2x from './images/app_store@2x.png'

import styles from './appStoreLink.module.scss'

interface IProps {
  className?: string
}

const b = stylesBlock(styles)

const AppStoreLink: React.FC<IProps> = ({ className }) => {
  return (
    <ExternalLink 
      href={APP_STORE_URL}
      className={b('item', className)}
    >
      <img
        src={appStore1x}
        srcSet={`${appStore2x} 2x`}
        alt='google play'
      />
    </ExternalLink>
  )
}

export default AppStoreLink
