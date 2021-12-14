
const findMainPhoto = (photos: IPhoto[]): IPhoto | undefined => {
  if (!photos.length) return undefined
  const mainPhoto = photos.find((photo) => photo.main === true)
  return mainPhoto || photos[0]
}

export default findMainPhoto
