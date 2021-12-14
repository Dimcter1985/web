import { build, fake } from 'test-data-bot'

export const dayWorkHoursFacotry = build<IDayWorkHours>('DayWorkHours').fields({
  start: fake(f => f.random.number({ min: 0, max: 420 })),
  end: fake(f => f.random.number({ min: 420, max: 1440 })),
  work: 'yes',
})

export const workHoursFactory = build<IWorkHours>('WorkHours').fields({
  mon: dayWorkHoursFacotry(),
  tue: dayWorkHoursFacotry(),
  wed: dayWorkHoursFacotry(),
  thu: dayWorkHoursFacotry(),
  fri: dayWorkHoursFacotry(),
  sat: dayWorkHoursFacotry(),
  sun: dayWorkHoursFacotry(),
})
