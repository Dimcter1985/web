import SalonFallback from 'core/resources/salon.jpg'
import get from 'lodash/get'

export default function getSalonImageUrl(image?: INullableImage, variant: 'thumb' | 'normal' = 'normal'): string | number {
  const url = get(image, variant === 'thumb' ? 'thumbUrl' : 'url')
  if (!url) return SalonFallback
  return url
}
