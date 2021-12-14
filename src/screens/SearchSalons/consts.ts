import { IOption } from 'types/option'
import { TSortSalons } from './hooks/useSearchData'


const sortOptions: IOption<TSortSalons>[] = [
  { id: 'near me', name: 'Near me' },
  { id: 'rating', name: 'Rating' },
]

export default sortOptions
