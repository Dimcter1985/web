import Head from 'next/head'

import { BASE_URL } from 'core/consts'
import findMainPhoto from 'utils/findMainPhoto'

interface IProps {
  salon: ISalon
}

const Scheme: React.FC<IProps> = ({ salon }) => {

  const {
    name,
    phone,
    photos,
    address,
    city,
    state,
    zipCode,
    priceRange,
    reviewsCount,
    overallRating,
    reviews,
  } = salon

  const mainPhoto = findMainPhoto(photos)
  const rating = overallRating ? overallRating.toFixed() : '0'

  const schemeReviews = reviews.map((review) => ({
    '@type': 'Review',
    'author': `${review.anonymous ? 'Anonymous' : review.reviewerName}`,
    'description': review.comment,
    'datePublished': review.updatedAt,
    'reviewRating': {
      '@type':'AggregateRating',
      'reviewCount': '1',
      'ratingValue': review.overallRating,
      'bestRating': '5',
      'worstRating': '0',
    },
  }))

  const scheme = {
    '@context':'https://schema.org/',
    '@type':'LocalBusiness',
    '@id': BASE_URL,
    'name': name,
    'priceRange': priceRange,
    'telephone': phone,
    'image': mainPhoto ? `${BASE_URL}${mainPhoto.image.thumbUrl}` : '',
    'address': {
      '@type':'PostalAddress',
      'streetAddress': address,
      'addressLocality': city,
      'addressRegion': state,
      'postalCode': zipCode,
    },
    'aggregateRating': {
      '@type':'AggregateRating',
      'reviewCount': reviewsCount,
      'ratingValue': rating,
      'bestRating': '5',
      'worstRating': '0',
    },
    'review': schemeReviews,
  }

  return (
    <Head>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scheme) }}
      />
    </Head>
  )
}

export default Scheme
