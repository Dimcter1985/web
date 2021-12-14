declare interface IServiceCategory extends IModel {
  id: number
  name: string
  position: number
  services: ICommonService[]
}

declare interface ICategory extends IModel {
  id: number
  name: string
  position: number
  services: ICommonService[]
  createdAt: string
  updatedAt: string
}

declare interface ISalonCategory extends IModel {
  id: number
  name: string
  position: number
  salonServices: ISalonService[]
}

declare interface IListCategory {
  id: number
  name: string
  image: INullableImage
  position: number
  services: ICommonService[]
}