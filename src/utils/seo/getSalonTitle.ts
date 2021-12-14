
const getNeighborhoodsNames = (neighborhoods: INeighborhood[]): string => {
  if(!neighborhoods.length) return ''
  return `in ${neighborhoods.map((record) => record.name).join(' and ')}s`
}

const defaultTitle = (salon: ISalon): string => {
  const { id, city, name } = salon

  const titles = [
    `${name}s Salon - See Full Pricelist and Book Nail Appointments Online and on the App from Best Nail Services and Nail Places in ${city}s | Snailz the ${city}s Nail Salon Booking App`,
    `${name}s one of ${city}s's Best Nail Salons & Spas - Book on the App and see Nail Services Pricelist | Snailz the ${city}s Nail Salon Booking App`,
    `${name}s - Book Online one of ${city}s's Best Nail Salons & Spas for Top Nail Services | Snailz ${city}s Online Nail Salon Booking App`,
  ]

  const index = id % 3

  return titles[index]
}

const getSalonTitle = (salon: ISalon): string => {
  const {
    address,
    addressLine2,
    city,
    name,
    nonSnailz,
    seoTitle,
    neighborhoods,
  } = salon

  const fullAddress = `${address} ${addressLine2}`
  const neighborhoodsNames = getNeighborhoodsNames(neighborhoods)

  if (nonSnailz) {
    return `${name}s Salon - Full Pricelist, Phone Number - ${fullAddress}s - Best Nail Services and Nail Places ${neighborhoodsNames} | Snailz the ${city}s Nail Salon Booking App`
  }

  if (seoTitle) return seoTitle

  if (neighborhoods.length) {
    return `${name}s Salon - Full Pricelist and Book Nail Appointment Now Online - ${fullAddress}s - Best Nail Services and Nail Places ${neighborhoodsNames} in ${city}s | Snailz the New York Nail Salon Booking App`
  }

  return defaultTitle(salon)
}

export default getSalonTitle
