declare interface INeighborhood extends IModel {
  areaId: number
  createdAt: Date
  featured: boolean
  filterable: boolean
  image: IImage
  name: string
  position: number
  slug: string
  updatedAt: Date
}
