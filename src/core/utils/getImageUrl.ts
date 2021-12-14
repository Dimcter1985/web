import { BASE_URL } from 'core/consts'

export default function getImageUrl(url: string): string {
  if (new RegExp('^(http|https)://').test(url)) return url
  return `${BASE_URL}${url}`
}
