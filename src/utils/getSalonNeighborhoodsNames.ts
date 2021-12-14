
const getSalonNeighborhoodsNames = ({ neighborhoods = [] }: ISalon): string => (
  neighborhoods.map((record) => record.name).join(', ')
)

export default getSalonNeighborhoodsNames
