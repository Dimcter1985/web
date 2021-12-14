const getSalonAddress = (salon: ISalon): string => {

  const { address, city } = salon

  if (!address) console.error('NO ADDRESS FOUND')
  if (!city) console.error('NO CITY FOUND')

  return `${city}, ${address}`
}

export default getSalonAddress
