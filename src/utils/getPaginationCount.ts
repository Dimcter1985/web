
interface IParams {
  total: number
  perPage: number
}

const getPaginationCount = ({ total , perPage }: IParams): number => {
  return Math.ceil(total / perPage)
}

export default getPaginationCount
