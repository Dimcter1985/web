type IParams = Pick<ISalon, 'address' | 'city'>

export default function combineAddress({ address, city }: IParams): string {
  return [address, city].join(', ')
}