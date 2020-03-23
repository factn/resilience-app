/*** IMPORTS ***/
// Module imports
import React, { Component } from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import styled from 'styled-components';
/*** [end of imports] ***/



const SmallMap = styled.div`
width: 30%;
height: 30vw;
`

const MediumMap = styled.div`
width: 40%;
height: 40vw;
`
const LargeMap = styled.div`
width: 60%;
height: 60vw;
`

export default class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 45.5017,
      lng: -73.5673
    },
    zoom: 11
  };

  render() {

    if(this.props.size === 'small'){
      return <SmallMap>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBCMv2-2yocCRDrzkbMMZgsCz339HldvdE" }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <div lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </SmallMap>
    }
    else if(this.props.size === 'medium'){
      return <MediumMap>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBCMv2-2yocCRDrzkbMMZgsCz339HldvdE" }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <div lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </MediumMap>
    }
    else if(this.props.size === 'large'){
      return <LargeMap>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBCMv2-2yocCRDrzkbMMZgsCz339HldvdE" }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <div lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </LargeMap>
    }

    return (
      <div>
      {this.props.size}
      </div>
    );
  }
}

SimpleMap.propTypes = {
  size: PropTypes.string
};
