import fetchFeaturedSalons from 'core/api/salons/fetchFeaturedSalons'
import useList, { IUseList } from './useList'

const useFeaturedSalons = (): IUseList<IListSalon> => useList<IListSalon>(fetchFeaturedSalons)

export default useFeaturedSalons