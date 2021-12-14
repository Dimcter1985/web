import Head from 'next/head'

import getSalonDecription from 'utils/seo/getSalonDescription'
import getSalonTitle from 'utils/seo/getSalonTitle'
import findMainPhoto from 'utils/findMainPhoto'

interface IProps {
  salon: ISalon
}

const Meta: React.FC<IProps> = ({ salon }) => {

  const {
    id: salonId,
    photos,
  } = salon

  const photo = findMainPhoto(photos)

  return (
    <Head>
      <title>{getSalonTitle(salon)}</title>
      <meta
        content={getSalonDecription(salon)}
        name='description'
      />
      { photo ? (
        <>
          <meta content={photo.image.thumbUrl} property='og:image' />
          <meta content={photo.image.thumbUrl} property='twitter:image' />
        </>
      ) : null}
      <meta content={`${salonId}`} name='salon_id' />
    </Head>
  )
}

export default Meta
