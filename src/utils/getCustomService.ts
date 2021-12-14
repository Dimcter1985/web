import pick from 'lodash/pick'

const getCustomService = (service: IListAppointmentService): ICustomService => ({
  id: service.salonServiceId,
  ...pick(service, ['name', 'cost']),
})

export default getCustomService
