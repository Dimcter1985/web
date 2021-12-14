import Layout, { IProps as ILayoutProps } from 'components/Layout'
import stylesBlock from 'utils/stylesBlock'
import BlackTheme from 'components/BlackTheme'
import styles from './StaticPageWrapper.module.scss'

const b = stylesBlock(styles)

const headerProps: ILayoutProps['header'] =  { container: { keepBackground: true } }
const pageProps: ILayoutProps['page'] = { offsetTop: 'header' }

const StaticPageWrapper: React.FC = ({children}) => {
  return (
    <Layout header={headerProps} page={pageProps}>
      <BlackTheme>
        <div className={b('content')}>
          {children}
        </div>
      </BlackTheme>
    </Layout>
  )
}

export default StaticPageWrapper