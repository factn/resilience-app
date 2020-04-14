const mbxClient = require("@mapbox/mapbox-sdk");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const baseClient = mbxClient({ accessToken: process.env.REACT_APP_MB_ACCESS_TOKEN });
const geoCodingService = mbxGeocoding(baseClient);

export default async function addressLookUp(address) {
  if (!address) {
    throw Error("no address to query with");
  }
  var response = await geoCodingService
    .forwardGeocode({
      query: address,
      limit: 5,
    })
    .send();
  if (
    response.body.features.length === 0 ||
    response.body.features[0] === undefined ||
    response.body.features[0] === "undefined"
  ) {
    console.log("no lat/long could be found");
    return // early return if not found
  }
  return {
    lat: response.body.features[0].center[1],
    long: response.body.features[0].center[0],
  };
}
