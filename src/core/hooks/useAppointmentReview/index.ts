import { useEffect, useMemo } from 'react'

import fetchAppointment from 'core/api/appointments/fetchAppointment'
import useApi from 'core/hooks/useApi'
import { REVIEW_QUERY_FIELDS } from './consts'
import { IAppointmentReview } from './types'

interface IUseAppointmentReview {
  hasComment: boolean
  hasPhotos: boolean
  loading: boolean
  review: IAppointmentReview['review'] | null
}

interface IProps {
  appointmentId: number
  queryFields?: string
}

const useAppointmentReview = ({ appointmentId, queryFields }: IProps): IUseAppointmentReview => {
  const { data, loading, fetch } = useApi<IAppointmentReview>(fetchAppointment)

  const review = useMemo(() => (
    data ? data.review : null
  ), [data])

  useEffect(() => {
    fetch({
      queryFields: queryFields || REVIEW_QUERY_FIELDS,
      id: appointmentId,
    })
  }, [])

  const hasComment = !!review && !!review.comment
  const hasPhotos = !!review && !!review.photos && !!review.photos.length

  return {
    hasComment,
    hasPhotos,
    loading,
    review,
  }
}

export default useAppointmentReview