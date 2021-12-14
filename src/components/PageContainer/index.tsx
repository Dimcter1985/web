import React from 'react'

import block from 'utils/stylesBlock'

import styles from './pageContainer.module.scss'

const b = block(styles)

interface IProps {
  offsetTop?: 'header'
  className?: string
}

const PageContainer: React.FC<IProps> = ({ offsetTop, className, children }) => (
  <div className={b('page', { 'offset-top': offsetTop }, className)}>
    { children }
  </div>
)

export default PageContainer
