import { useRouter } from 'next/router'

interface IParams {
  [key: string]: string | string[];
}

const useRouterParams = <T = IParams>(): T => {
  const router = useRouter()
  return (router?.query || {}) as unknown as T
}

export default useRouterParams
