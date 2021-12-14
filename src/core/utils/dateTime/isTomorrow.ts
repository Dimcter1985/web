import daysDiff from './daysDiff'

export default function isTomorrow(date?: Date | string): boolean {
  return daysDiff(date) === 1
}