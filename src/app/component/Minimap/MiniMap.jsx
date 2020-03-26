/*** IMPORTS ***/
// Module imports
import React, { Component } from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import { SmallMap, MediumMap, LargeMap } from "./MiniMap.style";
/*** [end of imports] ***/

export default class SimpleMap extends Component {
  GetSmallMap() {
    // fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCTUPfXaCbf5e_YRmqGR1scg9TjhTy2dBo`)
    // .then(
    //     function(response){
    //         if(response.status !== 200){
    //             console.log('Something went wrong ' + response.status);
    //             return;
    //         }

    //         response.json().then(function(data){

    //             let results = data.results[0].geometry.location;
    const location = {
      lat: 45.5017,
      lng: -73.5673,
    };
    return (
      <SmallMap>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCTUPfXaCbf5e_YRmqGR1scg9TjhTy2dBo" }}
          defaultCenter={location}
          defaultZoom={11}
        >
          <div lat={location.lat} lng={location.lng} text="U+25CF" />
        </GoogleMapReact>
      </SmallMap>
    );
    // });
    // })
  }

  GetMediumMap() {
    // fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCTUPfXaCbf5e_YRmqGR1scg9TjhTy2dBo`)
    // .then(
    //     function(response){
    //         if(response.status !== 200){
    //             console.log('Something went wrong ' + response.status);
    //             return;
    //         }

    //         response.json().then(function(data){

    //             let results = data.results[0].geometry.location;

    const location = {
      lat: 45.5017,
      lng: -73.5673,
    };
    return (
      <MediumMap>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCTUPfXaCbf5e_YRmqGR1scg9TjhTy2dBo" }}
          defaultCenter={location}
          defaultZoom={11}
        >
          <div lat={location.lat} lng={location.lng} text="U+25CF" />
        </GoogleMapReact>
      </MediumMap>
    );
    // });
    // })
  }

  GetLargeMap() {
    // fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCTUPfXaCbf5e_YRmqGR1scg9TjhTy2dBo`)
    // .then(
    //     function(response){
    //         if(response.status !== 200){
    //             console.log('Something went wrong ' + response.status);
    //             return;
    //         }

    //         response.json().then(function(data){
    //             let results = data.results[0].geometry.location;
    const location = {
      lat: 45.5017,
      lng: -73.5673,
    };
    return (
      <LargeMap>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCTUPfXaCbf5e_YRmqGR1scg9TjhTy2dBo" }}
          defaultCenter={location}
          defaultZoom={11}
        >
          <div lat={location.lat} lng={location.lng} text="hello" />
        </GoogleMapReact>
      </LargeMap>
    );
    // });
    // })
  }

  render() {
    console.log(this.props.size);

    return (
      <div data-id="">
        {this.props.size == "small"
          ? this.GetSmallMap()
          : this.props.size == "medium"
          ? this.GetMediumMap()
          : this.GetLargeMap()}
      </div>
    );
  }
}

SimpleMap.propTypes = {
  size: PropTypes.string,
  address: PropTypes.string,
};

SimpleMap.defaultProps = {
  size: "small",
  address: "1000 Chemin St Antoine",
};
