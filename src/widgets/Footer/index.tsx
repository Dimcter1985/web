import React from 'react'

import BlackTheme from 'components/BlackTheme'
import Container from 'components/Container'
import stylesBlock from 'utils/stylesBlock'

import SignupForm from './components/SignupForm'
import Copyright from './components/Copyright'
import Services from './components/Services'
import Agency from './components/Agency'
import Stores from './components/Stores'
import About from './components/About'

import styles from './footer.module.scss'

const b = stylesBlock(styles)

interface IProps {
  offset?: 'default'
  hide?: boolean
}

export const FOOTER_ID = 'footer'

const Footer: React.FC<IProps> = ({ offset, hide }) => {
  if (hide) { return null }
  
  return (
    <BlackTheme className={b('outer', { offset })}>
      <div id={FOOTER_ID}>
        <Container className={b('container')} >
          <div className={styles.row}>
            <Services />
            <SignupForm />
            <About />
          </div>
          <div className={styles.row}>
            <Stores />
            <Copyright />
          </div>
          <Agency />
        </Container>
      </div>
    </BlackTheme>
  )
}

export default Footer
