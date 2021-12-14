import { ONE_MINUTE_INTERVAL } from 'core/consts'

export default function timerTask(callback: () => void, timeout = ONE_MINUTE_INTERVAL): () => void {
  callback()
  const interval = setInterval(callback, timeout)  
  return (): void => clearInterval(interval)
}