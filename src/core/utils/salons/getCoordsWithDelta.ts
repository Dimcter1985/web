import getCoords from './getCoords'

interface IDimensions {
  width: number
  height: number
}

interface IParams {
  delta?: number
  dimensions?: IDimensions
}

const DIMENSIONS: IDimensions = {
  width: 300,
  height: 300,
}

const DELTA = 0.003

export function getLatLngDelta({
  delta = DELTA,
  dimensions = DIMENSIONS,
}: IParams = {}): ILatLngDelta {
  const { width, height } = dimensions
  return {
    latitudeDelta: delta,
    longitudeDelta: delta * (width / height),
  }
}

export default function getCoordsWithDelta(location: ILocation, delta?: IParams): IRegion {
  return { ...getCoords(location), ...getLatLngDelta(delta) }
}