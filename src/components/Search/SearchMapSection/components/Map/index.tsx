import { useRef, useCallback, useEffect } from 'react'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'

import useRouter from 'hooks/useRouter'
import useSearch from 'hooks/useSearch'
import { googleMapURL } from 'consts'
import useGeolocation from 'core/hooks/useGeolocation'

import { marker } from './icons/marker'
import { markerHover } from './icons/markerHover'

interface IProps {
  salons?: IListSalon[]
}

const Map: React.FC<IProps> = ({ salons }) => {
  const { hoverSalonId, followMapCenter, setCurrentMapCenter } = useSearch()
  const { push } = useRouter()
  const { location } = useGeolocation()

  const mapRef = useRef<GoogleMap>(null)

  const changeMapCenter = useCallback(() => {
    if (!followMapCenter || !mapRef || !mapRef.current) { return }
    setCurrentMapCenter(mapRef.current.getCenter().toJSON())
  }, [followMapCenter, setCurrentMapCenter])

  useEffect(() => {
    changeMapCenter()
  }, [followMapCenter])

  const onMarkerClick = (slug: string): Promise<boolean> => push(`/${slug}`)

  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={location}
      ref={mapRef}
      onDragEnd={changeMapCenter}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        rotateControl: false,
        zoomControlOptions: {
          position: (window as any).google.maps.ControlPosition.TOP_RIGHT,
        },
      }}
    >
      { salons?.map(({ id, slug, location: position }) => (
        <Marker
          key={id}
          position={position}
          onClick={() => onMarkerClick(slug)}
          icon={{
            url: id === hoverSalonId ? markerHover : marker,
          }}
          zIndex={id === hoverSalonId ? 2 : 1}
        />
      ))}
    </GoogleMap>
  )
}

const WithScriptMap = withScriptjs(withGoogleMap(Map))

const ConnectedMap: React.FC<IProps> = ({ salons }) => (
  <WithScriptMap 
    googleMapURL={googleMapURL} 
    loadingElement={<div style={{ height: '100%', backgroundColor: 'lightgray' }} />}
    containerElement={<div style={{ height: '100%' }} />}
    mapElement={<div style={{ height: '100%' }} />}
    salons={salons}
  />
)

export default ConnectedMap
