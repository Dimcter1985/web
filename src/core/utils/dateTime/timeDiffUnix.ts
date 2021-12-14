import moment from 'moment'

// Returns time in seconds
export default function timeDiffUnix(time: Date | string): number {
  return moment(time).unix() - moment().unix()
}