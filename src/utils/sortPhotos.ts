import orderBy from 'lodash/orderBy'

const sortPhotos = (photos: IPhoto[]): IPhoto[] => {
  return orderBy(photos, ['main', 'position'], ['desc', 'asc'])
}

export default sortPhotos
