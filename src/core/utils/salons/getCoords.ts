export default function getCoords(location: ILocation): ILatLng {
  return {
    latitude: location.lat,
    longitude: location.lng,
  }
}