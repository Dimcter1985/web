import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Head from 'next/head'
import BlackTheme from 'components/BlackTheme'
import styles from './ReceiptContainer.module.scss'

interface IProps {
  className?: string;
  title?: string;
}

const b = stylesBlock(styles)

const ReceiptContainer: React.FC<IProps> = ({ className, title, children }) => (
  <BlackTheme className={b('root')}>
    <Head>
      <title>{ title }</title>
    </Head>
    <div className={b('container', className)}>
      { children }
    </div>
  </BlackTheme>
)

export default ReceiptContainer
