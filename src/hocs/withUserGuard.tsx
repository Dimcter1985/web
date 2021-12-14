import { useEffect } from 'react'
import useApp from 'core/hooks/useApp'
import useRouter from 'hooks/useRouter'

function defaultRedirect () {
  return '/'
}

interface IInjectedProps {
  user: ICustomer
}

const withUserGuard = (
  InputComponent: React.ComponentType<any>,
  redirect: (props: React.ComponentProps<typeof InputComponent>) => string = defaultRedirect,
): React.FC<React.ComponentProps<typeof InputComponent> & IInjectedProps> => {

  const WithUserGuard = (
    props: React.ComponentProps<typeof InputComponent>,
  ): React.ReactElement | null => {
    const { user, isLogged, ready } = useApp()

    const { push } = useRouter()

    useEffect(() => {
      if (ready && !isLogged) {
        push(redirect(props))
      }
    }, [ready, isLogged, push])

    if (!ready) { return null } // TODO: Show loader instead

    if (!user) { return null }

    return (
      <InputComponent {...props} user={user} />
    )
  }

  return WithUserGuard
}

export default withUserGuard
