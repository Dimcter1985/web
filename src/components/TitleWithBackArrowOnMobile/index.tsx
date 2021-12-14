import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import IconButton from 'components/IconButton'
import VisibleOn from 'components/VisibleOn'
import Text from 'components/Text'
import { ReactComponent as BackArrow } from './icons/back_arrow.svg'
import styles from './TitleWithBackArrowOnMobile.module.scss'

interface IProps {
  className?: string
}

const b = stylesBlock(styles)

const TitleWithBackArrowOnMobile: React.FC<IProps> = ({ className, children }) => (
  <div className={b('wrapper')}>
    <VisibleOn tablet mobile>
      <IconButton className={b('button')}>
        <BackArrow />
      </IconButton>
    </VisibleOn>
    <Text className={b('title', className)}>{ children }</Text>
  </div>
)

export default TitleWithBackArrowOnMobile
