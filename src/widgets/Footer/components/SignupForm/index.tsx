import React from 'react'
import { Form } from 'react-final-form'

import TextInput from 'components/Inputs/TextInput'
import Button from 'components/Button'
import Text from 'components/Text'

import styles from './signupForm.module.scss'

const SignupForm: React.FC = () => {

  return (
    <div className={styles.root}>
      <Form
        onSubmit={console.log}
        render={({ handleSubmit, submitting, submitSucceeded }): JSX.Element => (
          <>
            <Text className={styles.caption}>
              {submitSucceeded
                ? 'Thank you for subscribing!'
                : <span>Stay up to date about our new locations and <br /> exclusive offers in your neighborhood</span>}
            </Text>
            <div className={styles.form}>
              <TextInput
                classes={{ input: styles.input }}
                fullWidth
                name='email'
                placeholder='EMAIL'
              />
              <TextInput
                classes={{ input: styles.input }}
                fullWidth
                name='zipCode'
                placeholder='ZIP CODE'
              />
              <Button
                className={styles.submit}
                disabled={submitting}
                onClick={handleSubmit}
              >
                {submitting ? 'SUBMITTING' : 'SIGN ME UP'}
              </Button>
            </div>
          </>
        )}
      />
    </div>
  )
}

export default SignupForm