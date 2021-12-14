declare interface IPhoto {
  createdAt: string
  id: number
  image: IImage
  imageableId: number
  imageableType: string
  main: boolean
  position: string
  updatedAt: string
}