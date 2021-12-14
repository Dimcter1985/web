export default function getBookFormServicesNames(
  services: IBookFormService[],
  customServices: IMinimalService[] = [],
): string {

  return [
    ...customServices.map(s => s.name),
    ...services.map(({ service }) => service.name),
  ].join(', ')
}