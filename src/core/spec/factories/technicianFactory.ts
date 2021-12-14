import { build, fake, incrementingId } from 'test-data-bot'

export const technicianFactory = build<ITechnician>('Technician').fields({
  address: fake(f => f.address.streetAddress()),
  allSalonServices: fake(f => f.random.boolean()),
  city: fake(f => f.address.city()),
  email: fake(f => f.internet.email()),
  firstName: fake(f => f.name.firstName()),
  id: incrementingId(),
  lastName: fake(f => f.name.lastName()),
  mobile: fake(f => f.phone.phoneNumber()),
  nick: fake(f => f.internet.userName()),
  state: fake(f => f.address.state()),
  timeSlots: [],
  zipCode: fake(f => f.address.zipCode()),
})

export const timeSlotFactory = build<IAvailableTimeSlot>('TimeSlot').fields({
  slot: fake(f => f.random.number(1080)),
  technicianId: incrementingId(),
})