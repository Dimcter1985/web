import { useCallback } from 'react'
import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'

import convertToFormErrors from 'core/utils/api/convertToFormErrors'
import updateCustomerProfile from 'core/api/auth/updateProfile'
import splitFullName from 'core/utils/user/splitFullName'
import useApp from './useApp'

interface IUseUpdateProfile<T> {
  updateProfile: (values: T & IEditProfileValues, callback?: () => void) => Promise<IResult | IFormErrors | undefined>
}

const useUpdateProfile = <T>(): IUseUpdateProfile<T> => {
  const { updateUser } = useApp()

  const updateProfile = useCallback(async (formValues: T & IEditProfileValues, callback?: () => void) => {
    try {
      const { fullName, ...rest } = formValues
      const values = pickBy({
        ...rest,
        ...splitFullName(fullName as string),
      }, identity)

      const user = await updateCustomerProfile<IUpdateProfileParams>(values)
      updateUser(user)

      if (callback) callback()
    } catch (error) {
      return convertToFormErrors(error)
    }
  }, [updateCustomerProfile, updateUser])

  return {
    updateProfile,
  }
}

export default useUpdateProfile