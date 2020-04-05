const mbxClient = require('@mapbox/mapbox-sdk');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const baseClient = mbxClient({ accessToken: process.env.REACT_APP_MB_ACCESS_TOKEN });
const geoCodingService =  mbxGeocoding(baseClient);

export default function addressLookUp(address) {
    let executed = false
    !address ? console.log('No address to query with') :
    geoCodingService.forwardGeocode({
        query: address,
        limit: 5
      })
        .send()
        .then(response => { 
          if(response.body.features.length != 0){
            const newObject = {
              lat: response.body.features[0].center[1],
              long: response.body.features[0].center[0]
          };
          console.log(newObject)
          };
    }).catch(error => console.log(error));
};