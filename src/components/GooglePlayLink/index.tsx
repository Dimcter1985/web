import { GOOGLE_PLAY_URL } from 'core/consts'
import ExternalLink from 'components/ExternalLink'
import stylesBlock from 'utils/stylesBlock'

import googlePlay1x from './images/google_play@1x.png'
import googlePlay2x from './images/google_play@2x.png'

import styles from './googlePlayLink.module.scss'

interface IProps {
  className?: string
}

const b = stylesBlock(styles)

const GooglePlayLink: React.FC<IProps> = ({ className }) => {
  return (
    <ExternalLink 
      href={GOOGLE_PLAY_URL}
      className={b('item', className)}
    >
      <img
        src={googlePlay1x}
        srcSet={`${googlePlay2x} 2x`}
        alt='google play'
      />
    </ExternalLink>
  )
}

export default GooglePlayLink
