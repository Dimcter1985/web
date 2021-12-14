type ISimpleService = Pick<IService, 'name'>

export default function getServicesNames(services: ISimpleService[], customServices: ISimpleService[] = []): string {
  return [...services, ...customServices].map(({ name }) => name).join(', ')
}