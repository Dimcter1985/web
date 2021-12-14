import React, { useCallback } from 'react'
import { Form } from 'react-final-form'
import omit from 'lodash/omit'
import stylesBlock from 'utils/stylesBlock'
import times from 'lodash/times'
import convertToFormErrors from 'core/utils/api/convertToFormErrors'
import createPotentialSalon, { IParams } from 'api/createPotentialSalon'
import useMediaQueries from 'hooks/useMediaQueries'
import getFullNumber from 'utils/getFullNumber'

import InfoCard from 'components/InfoCard'
import Title from 'components/Title'
import Text from 'components/Text'
import TextInput from 'components/Inputs/TextInput'
import CodeCountryInput from 'components/Inputs/CodeCountryInput'
import PhoneInput from 'components/Inputs/PhoneInput'
import Button from 'components/Button'
import { FAQS_SECTION } from '../../consts'
import { FAQS as faqs, FORM_FIELDS } from './consts'
import validator from './validator'
import Wrapper from '../../components/Wrapper'
import styles from './FAQS.module.scss'

interface IValues extends IParams {
  codeCountry: string;
}

const b = stylesBlock(styles)

const validate = (values: IValues) => (
  validator({
    ...omit(values, ['codeCountry', 'phone']),
    phone: values.phone ? getFullNumber(values.codeCountry, values.phone) : '',
  })
)

const FAQS: React.FC = () => {
  const { isSmallScreen } = useMediaQueries()

  const submit = useCallback(async (values: IValues) => {
    try {
      await createPotentialSalon({
        ...omit(values, ['codeCountry', 'phone']),
        phone: getFullNumber(values.codeCountry, values.phone),
      })
    } catch(error) {
      return convertToFormErrors(error)
    }
  }, [createPotentialSalon, convertToFormErrors])
  
  return (
    <Wrapper>
      <div id={FAQS_SECTION} className={b('content')}>
        <div className={b('faqs')}>
          { times(faqs.length, (index) => (
              <InfoCard
                key={index.toString()}
                textAlign={isSmallScreen ? 'center' : 'left'}
                className={b('card')}
                title={faqs[index].title}
                subtitle={faqs[index].text}
              />
          ))}
        </div>
        <div className={b('more')}>
          <Title size='small'>Thinking about joining us?</Title>
          <Text
            className={b('subtitle')}
            variant='h5'
          >
            Leave your information below and we'll be in touch!
          </Text>
          <Form
            onSubmit={submit}
            validate={validate}
            render={({ handleSubmit, submitting }): React.ReactNode => (
              <form className={b('form')} onSubmit={handleSubmit}>
                <div className={b('fields')}>
                  <TextInput
                    name={FORM_FIELDS.OWNER_NAME}
                    label="Owners's name"
                    fullWidth
                  />
                  <TextInput
                    name={FORM_FIELDS.NAME}
                    label='Salon name'
                    fullWidth
                  />
                  <TextInput
                    name={FORM_FIELDS.ZIP_CODE}
                    label='ZIP code'
                    fullWidth
                  />
                  <TextInput
                    name={FORM_FIELDS.EMAIL}
                    label='Email'
                    fullWidth
                  />
                  <CodeCountryInput
                    name={FORM_FIELDS.CODE_COUNTRY}
                    label='Country'
                    fullWidth
                  />
                  <PhoneInput
                    name={FORM_FIELDS.PHONE}
                    label='Phone number'
                    fullWidth
                  />
                </div>
                <Button
                  className={b('button')}
                  disabled={submitting}
                  size='large'
                >
                  Send
                </Button>
              </form>
            )}
          />
        </div>
      </div>
    </Wrapper>
  )
}

export default FAQS
