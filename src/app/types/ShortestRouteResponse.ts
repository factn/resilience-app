import Geolocation from "./GeoLocation";

type ShortestRouteResponse = {
  geolocations: Geolocation[];
  order: number[];
};

export default ShortestRouteResponse;
