/*** IMPORTS ***/
// Module imports
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { SmallMap, MediumMap, LargeMap } from "./MiniMap.style";
/*** [end of imports] ***/

export default class SimpleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {
        lat: 45.5017,
        lng: -73.5673,
      },
      zoom: 11,
    };
  }

  GetSmallMap() {
    return (
      <SmallMap>
        <Map center={this.state.position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={this.state.position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </SmallMap>
    );
  }

  GetMediumMap() {
    return (
      <MediumMap>
        <Map center={this.state.position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={this.state.position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </MediumMap>
    );
  }

  GetLargeMap() {
    return (
      <LargeMap>
        <Map center={this.state.position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={this.state.position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </LargeMap>
    );
  }

  render() {
    return (
      <div id="maps" style={{ height: "180px" }}>
        {this.props.size === "small"
          ? this.GetSmallMap()
          : this.props.size === "medium"
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
