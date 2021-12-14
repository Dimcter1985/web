import React from 'react'

import Link from 'components/Link'
import useAuthDialog from 'hooks/useAuthDialog'

import styles from './authActions.module.scss'

const AuthActions: React.FC = () => {

  const { show } = useAuthDialog()

  return (
    <div className={styles.container}>
      <Link
        className={styles.buttonSignUp}
        aria-controls='sign up'
        component='button'
        onClick={show}
      >
        Sign up
      </Link>
      <p className={styles.separator}>or</p>
      <Link
        className={styles.buttonLogIn}
        aria-controls='log in'
        component='button'
        onClick={show}
      >
        Log in
      </Link>
    </div>
  )
}

export default AuthActions