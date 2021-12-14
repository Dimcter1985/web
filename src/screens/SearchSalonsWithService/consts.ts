import { IOption } from 'types/option'
import { TSortFreeSlots } from './hooks/useSearchData'

const sortOptions: IOption<TSortFreeSlots>[] = [
  { id: 'near me', name: 'Near me' },
  { id: 'rating', name: 'Rating' },
]

export default sortOptions
