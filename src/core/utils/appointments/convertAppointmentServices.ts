const convertAppointmentServices = (appointmentServices: IListAppointmentService[]): IServicePack[] => (
  appointmentServices.map((service) => ({
    service: {
      id: service.salonServiceId,
      name: service.name,
      cost: service.cost,
    },
    quantity: service.quantity,
  }))
)

export default convertAppointmentServices
