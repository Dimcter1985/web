import useApp from 'core/hooks/useApp'

const useCurrentUserSafe = (): ICustomer => {
  const { user } = useApp()

  if (!user) {
    throw new Error('User should be!')
  }

  return user
}

export default useCurrentUserSafe