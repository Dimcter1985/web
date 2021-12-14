import useApp from 'core/hooks/useApp'

const useCurrentUser = (): ICustomer | null => {
  const { user } = useApp()

  return user
}

export default useCurrentUser