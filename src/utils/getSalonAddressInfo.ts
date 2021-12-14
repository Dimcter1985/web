import getSalonAddress from './getSalonAddress'
import getSalonNeighborhoodsNames from './getSalonNeighborhoodsNames'

const getSalonAddressInfo = (salon: ISalon) => {
  if (salon.neighborhoods.length) {
    return `${getSalonNeighborhoodsNames(salon)} | ${getSalonAddress(salon)}`
  }
  return getSalonAddress(salon)
}

export default getSalonAddressInfo
