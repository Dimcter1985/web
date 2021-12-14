import React from 'react'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'

import { googleMapURL } from 'consts'

import { mark } from './icons/mark'

type ITest = React.ComponentProps<typeof GoogleMap>

interface IProps extends ITest {
  location: ILocation
  marker?: string
}

const Map: React.FC<IProps> = ({ location, marker = mark, ...props }) => {
  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={location}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        rotateControl: false,
        zoomControl: false,
      }}
      {...props}
    >
      <Marker
        position={location}
        icon={{
          url: marker,
        }}
      />
    </GoogleMap>
  )
}

const WithScriptMap = withScriptjs(withGoogleMap(Map))

const ConnectedMap: React.FC<IProps> = (props) => (
  <WithScriptMap 
    googleMapURL={googleMapURL} 
    loadingElement={<div style={{ height: '100%', backgroundColor: 'lightgray' }} />}
    containerElement={<div style={{ height: '100%' }} />}
    mapElement={<div style={{ height: '100%' }} />}
    {...props}
  />
)

export default ConnectedMap
