const mbxClient = require("@mapbox/mapbox-sdk");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const baseClient = mbxClient({ accessToken: process.env.REACT_APP_MB_ACCESS_TOKEN });
const geoCodingService = mbxGeocoding(baseClient);

export default function addressLookUp(address) {
  if (!address) {
    return "";
  }
  return geoCodingService
    .forwardGeocode({
      query: address,
      limit: 5,
    })
    .send();
}
