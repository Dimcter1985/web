import React, { useEffect } from 'react'
import stylesBlock from 'utils/stylesBlock'
import useApp from 'core/hooks/useApp'
import useAuthDialog from 'hooks/useAuthDialog'
import Layout from 'components/Layout'
import Container from 'components/Container'
import styles from './AccountLayout.module.scss'

interface IProps {
  className?: string;
}

const b = stylesBlock(styles)

const AccountLayout: React.FC<IProps> = ({ children }) => {
  const { isLogged, ready } = useApp()
  const { show } = useAuthDialog()

  useEffect(() => {
    if (ready && !isLogged) {
      show()
    }
  }, [isLogged, ready, show])

  return (
    <Layout page={{ offsetTop: 'header' }}>
      <Container className={b('container')}>
        { isLogged && children }
      </Container>
    </Layout>
  )
}

export default AccountLayout
