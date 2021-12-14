import Layout, { IProps as ILayoutProps } from 'components/Layout'
import Container from 'components/Container'
import Text from 'components/Text'

const headerProps: ILayoutProps['header'] =  { container: { keepBackground: true } }
const pageProps: ILayoutProps['page'] = { offsetTop: 'header' }

const NotFound: React.FC = () => {
  return (
    <Layout header={headerProps} page={pageProps}>
      <Container>
        <Text>Page not found</Text>
      </Container>
    </Layout>
  )
}

export default NotFound
