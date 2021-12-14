import React, { useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import omit from 'lodash/omit'
import moment from 'moment'
import stylesBlock from 'utils/stylesBlock'

import withUserGuard from 'hocs/withUserGuard'
import useApi from 'core/hooks/useApi'
import fetchAppointment from 'core/api/appointments/fetchAppointment'
import { DAY_FORMAT, TIME_FORMAT } from 'core/consts/dateTime'
import { FORM_FIELDS } from 'core/forms/review/consts'
import createReview from 'core/api/review/createReview'
import useVisibility from 'hooks/useVisibility'

import AccountLayout from 'components/Account/AccountLayout'
import AccountNavigation from 'components/Account/AccountNavigation'
import AccountButton from 'components/Account/AccountButton'
import TextInput from 'components/Inputs/TextInput'
import YesNoInput from 'components/Inputs/YesNoInput'
import Text from 'components/Text'
import ConfirmDialogWrapper from 'components/ConfirmDialog/ConfirmDialogWrapper'
import ConfirmDialogTitle from 'components/ConfirmDialog/ConfirmDialogTitle'
import ConfirmDialogActions from 'components/ConfirmDialog/ConfirmDialogActions'
import ConfirmDialogButton from 'components/ConfirmDialog/ConfirmDialogButton'
import validator from './validator'
import {
  IReviewAppointment,
  LIST_APPOINTMENT_QUERY_FIELDS,
  COUNT_OF_ROWS,
  COMMENT_PLACEHOLDER,
  IReviewFormValues,
  RETURN_QUERY_REVIEW,
  MAX_COMMENT_LENGHT,
} from './consts'
import RatingInput from './components/RatingInput'
import Photos from './components/Photos'
import Anonymous from './components/Anonymous'
import styles from './Review.module.scss'

const b = stylesBlock(styles)

const Review: React.FC = () => {
  const { visible, show } = useVisibility(false)
  const router = useRouter()
  const { id } = router.query
  const { data: appointment, fetch } = useApi<IReviewAppointment>(fetchAppointment)

  useEffect (() => {
    if (!id) { return }
    
    fetch({
      queryFields: LIST_APPOINTMENT_QUERY_FIELDS,
      id: parseInt(id as string, 10),
    })
  }, [id])
  
  const hasReview = useMemo(() => {
    if (appointment) {
      return !!appointment.review
    }
  }, [appointment])

  const initValue = useMemo(() => {
    if (appointment && appointment.review) {
      return appointment.review
    }
    return ({
      overallRating: 0,
      promptnessRating: 0,
      professionalismRating: 0,
      cleanlinessRating: 0,
      anonymous: false,
    })
  }, [appointment])

  const normalizeParams = (values: IReviewFormValues) => ({
    queryFields: RETURN_QUERY_REVIEW,
    appointmentId: parseInt(id as string, 10),
    ...omit(values, ['photos']),
    photosAttributes: values.photos 
      ? values.photos.map((photo) => ({
        image: photo.image as unknown as File,
      }))
      : undefined,
  })

  const submit = useCallback(async (values: IReviewFormValues) => {
    createReview(normalizeParams(values))
      .then(() => show())
      .catch((error) => alert(error.message))
  }, [id])

  const goBack = useCallback(() => router.push('/account/past'), [])

  if (!appointment) { return null }

  const { startsAt, salon } = appointment

  const appointmentDate = moment(startsAt).tz(salon.timezone).format(DAY_FORMAT)
  const appointmentTime = moment(startsAt).tz(salon.timezone).format(TIME_FORMAT)
  
  return (
    <AccountLayout>
      <AccountNavigation activeItem='past' />
      <div className={b('content')}>
        <Text className={b('header')}>
          { hasReview ? 'Your review' : 'Review Appointment' }
        </Text>
        <Text className={b('description')}>
          { !hasReview && <>How was your experience at<br /></> }
          {`${salon.name} - ${appointmentDate} ${appointmentTime}`}
        </Text>
        <Form
          onSubmit={submit}
          initialValues={initValue}
          validate={validator}
          mutators={{
            ...arrayMutators,
          }}
          render={({ handleSubmit, submitting, hasValidationErrors }): React.ReactNode => (
            <form onSubmit={handleSubmit}>
              <div className={b('form')}>
                <div className={b('ratings')}>
                  <RatingInput
                    name={FORM_FIELDS.OVERALL_RATING}
                    label='Overall Experience'
                    readOnly={hasReview}
                  />
                  <RatingInput
                    name={FORM_FIELDS.PROMPTNESS_RATING}
                    label='Promptness'
                    readOnly={hasReview}
                  />
                  <RatingInput
                    name={FORM_FIELDS.PROFESSIONALISM_RATING}
                    label='Quality'
                    readOnly={hasReview}
                  />
                  <RatingInput
                    name={FORM_FIELDS.CLEANLINESS_RATING}
                    label='Cleanliness'
                    readOnly={hasReview}
                  />
                </div>
                <div className={b('other')}>
                  <TextInput
                    name={FORM_FIELDS.COMMENT}
                    classes={{ root: b('textfield') }} 
                    InputLabelProps={{ className: b('label') }}
                    inputProps={{ maxLength: MAX_COMMENT_LENGHT, readOnly: hasReview }}
                    label={hasReview ? 'Comments' : 'Comments (Optional)'}
                    multiline
                    rows={COUNT_OF_ROWS}
                    fullWidth
                    placeholder={!hasReview ? COMMENT_PLACEHOLDER : null}
                  />
                  <Photos
                    label={hasReview ? 'Photos' : 'Photos (Optional)'}
                    name={FORM_FIELDS.PHOTOS}
                    readOnly={hasReview}
                    hasReview={hasReview!}
                  />
                  { !hasReview ?
                    <YesNoInput
                      name={FORM_FIELDS.ANONYMOUS}
                      label='Post Anonymously'
                      labelClassName={b('anonymous')}
                    />
                    : <Anonymous name={FORM_FIELDS.ANONYMOUS} /> 
                  }
                </div>
              </div>
              <div className={b('buttons')}>
                <AccountButton
                  className={b('button')}
                  variant='outlined'
                  onClick={goBack}
                >
                  Back
                </AccountButton>
                { !hasReview &&
                  <AccountButton
                    className={b('button', { disabled: hasValidationErrors })}
                    type='submit'
                    disabled={submitting}
                  >
                    Submit review
                  </AccountButton>
                }
              </div>
            </form>
          )}
        />
      </div>
      <ConfirmDialogWrapper open={visible} onClose={goBack}>
        <ConfirmDialogTitle className={b('confirm-content')}>Review submitted - tanks you!</ConfirmDialogTitle>
        <ConfirmDialogActions>
          <ConfirmDialogButton onClick={goBack}>Back</ConfirmDialogButton>
        </ConfirmDialogActions>
      </ConfirmDialogWrapper>
    </AccountLayout>
  )
}

export default withUserGuard(Review)
