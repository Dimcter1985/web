export default function convertCustomServices(services: ICustomService[]): IServicePack[] {
  return services.map((service) => ({ service: {...service}, quantity: 1 }))
}