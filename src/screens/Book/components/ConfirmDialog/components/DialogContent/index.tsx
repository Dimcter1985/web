import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import ExternalLink from 'components/ExternalLink'
import styles from './DialogContent.module.scss'

const b = stylesBlock(styles)

const DialogConten: React.FC = () => (
  <>
    I acknowledge that my card will be <b>CHARGED IN FULL at the START of my appointment.</b>
    <br />
    <br />
    See <ExternalLink className={b('link')} href='/faq'>FAQ</ExternalLink> and <ExternalLink className={b('link')} href='terms'>Terms & Conditions</ExternalLink> for more details.
  </>
)

export default DialogConten
