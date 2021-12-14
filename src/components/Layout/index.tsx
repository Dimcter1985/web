import React, { ComponentProps } from 'react'
import stylesBlock from 'utils/stylesBlock'

import PageContainer from 'components/PageContainer'
// import MediaHelper from 'components/MediaHelper'
import Header from 'widgets/Header'
import Footer from 'widgets/Footer'
import { HeaderProvider } from 'contexts/header'
import styles from './Layout.module.scss'

type IHeaderProps = ComponentProps<typeof Header>
type IFooterProps = ComponentProps<typeof Footer>
type IPageProps = ComponentProps<typeof PageContainer>

interface ILayoutProps {
  className?: string;
  header?: IHeaderProps;
  footer?: IFooterProps;
  page?: IPageProps;
}

export type IProps = ILayoutProps

const b = stylesBlock(styles)

const Layout: React.FC<ILayoutProps> = ({ children, className, header, footer, page }) => (
  <div className={b('layout', className)}>
    {/* <MediaHelper /> */}
    <Header {...header} />
    <PageContainer {...page}>
      { children }
    </PageContainer>
    <Footer {...footer} /> 
  </div>
)

const ConnectedLayout: React.FC<IProps> = (props) => (
  <HeaderProvider>
    <Layout {...props} />
  </HeaderProvider>
)

export default ConnectedLayout
