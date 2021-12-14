import React, { useCallback, useMemo } from 'react'
import { Form } from 'react-final-form'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import stylesBlock from 'utils/stylesBlock'
import useApp from 'core/hooks/useApp'
import convertToFormErrors from 'core/utils/api/convertToFormErrors'
import updateCustomerProfile from 'core/api/auth/updateProfile'
import TextInput from 'components/Inputs/TextInput'
import AccountButton from 'components/Account/AccountButton'
import { makeStyles } from '@material-ui/core/styles'
import validator from './validator'
import { FORM_FIELDS, IAccountEditFormValue } from './consts'
import Section from './components/Section'
import DoubleField from './components/DoubleField'
import styles from './EditForm.module.scss'

const useStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0, 0, 0, 0.35)',
    },
  },
})

const b = stylesBlock(styles)

const EditForm: React.FC = () => {
  const classes = useStyles()
  const { user, updateUser } = useApp()

  const initValue = useMemo(() => ({
    ...pick(user, [
      'firstName',
      'lastName',
      'email',
      'birthday',
      'gender',
      'city',
      'state',
      'zipCode',
    ]),
  }), [user])

  const update = useCallback(async (values: IAccountEditFormValue) => {
    try {
      const updatedUser = await updateCustomerProfile<IUpdateProfileParams>({
        ...omit(values, ['email', 'birthday']),
        birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : undefined,
      })
      updateUser(updatedUser)
    } catch (error) {
      convertToFormErrors(error)
    }
  }, [updateCustomerProfile, updateUser])

  return (
    <Form
      initialValues={initValue}
      onSubmit={update}
      validate={validator}
      render={({ handleSubmit, submitting }): React.ReactNode => (
        <form className={b('form')} onSubmit={handleSubmit}>
          <Section title='Personal info'>
            <DoubleField>
              <TextInput
                classes={{root: classes.root}}
                className={b('composite')}
                name={FORM_FIELDS.FIRST_NAME}
                label='First name'
              />
              <TextInput
                classes={{root: classes.root}}
                className={b('composite')}
                name={FORM_FIELDS.LAST_NAME}
                label='Last name'
              />
            </DoubleField>
            <TextInput
              classes={{root: classes.root}}
              name={FORM_FIELDS.EMAIL}
              label='Email'
              InputProps={{ readOnly: true }}
            />
          </Section>
          <AccountButton
            className={b('button')}
            type='submit'
            disabled={submitting}
          >
            Save
          </AccountButton>
        </form>
      )}
    />
  )
}

export default EditForm
