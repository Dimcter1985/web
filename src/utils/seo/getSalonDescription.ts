
const getSalonDecription = (salon: ISalon): string => {
  const {
    name,
    city,
    address,
    state,
    zipCode,
    seoDescription,
  } = salon

  if (seoDescription) return seoDescription

  return `${name} one of ${city} Best Nail Salons &amp; Spas: Phone, Hours Today, Reviews, Price. Adress: ${address}, ${city}, ${state} ${zipCode}`
}

export default getSalonDecription
