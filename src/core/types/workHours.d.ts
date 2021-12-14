declare interface IDayWorkHours {
  start: number
  end: number
  work: 'yes' | 'no'
}

declare type IWorkHours = {
  [P in IWeekDayAbbr]: IDayWorkHours
}

declare interface ISlot {
  start: number
  end: number
}

declare interface IFreeSlot {
  slots: Date[] // ISO date and time
  technicianId: number
}

declare type IWeekDayAbbr =
  | 'mon'
  | 'tue'
  | 'wed'
  | 'thu'
  | 'fri'
  | 'sat'
  | 'sun'