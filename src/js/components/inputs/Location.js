/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import { faMapMarkerAlt } from "@fortawesome/fontawesome-free-solid"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete"

// Local component
import InputIconWrap from "./InputIconWrap"
import GoogleMaps from "../GoogleMaps"
/*** [end of imports] ***/

export default class Location extends Component {
  state = {
    address: "",
    latLng: {
      lat: this.props.lat || -41.280789,
      lng: this.props.lon || 174.775187
    }
  }

  handleChange = address => {
    this.setState({ address })
  }
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        // console.info("Success", latLng)

        this.setState({
          latLng
        })
      })
      .catch(error => {
        // console.error("Error", error)
      })
  }
  handleLatChange = e => e.target.value
  handleLonChange = e => e.target.value

  render() {
    const { latLng } = this.state
    const { inputID, disabledField } = this.props

    const activeStyle = {
      background: "#fafafa",
      cursor: "pointer",
      fontSize: "0.8rem",
      fontWeight: "300",
      padding: "0.25rem 0.5rem"
    }
    const inactiveStyle = {
      background: "#fff",
      cursor: "pointer",
      fontSize: "0.8rem",
      fontWeight: "300",
      padding: "0.25rem 0.5rem"
    }

    return (
      <Fragment>
        <InputIconWrap id={inputID} icon={faMapMarkerAlt}>
          <div
            className={
              disabledField
                ? "input-wrap disabled-input places-autocomplete"
                : "input-wrap places-autocomplete"
            }
          >
            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
              id={inputID}
              highlightFirstSuggestion={true}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                <Fragment>
                  <input
                    {...getInputProps({
                      placeholder: "Enter your address...",
                      className: "input-field"
                    })}
                    id={inputID}
                  />
                  <div className="autocomplete-dropdown-container">
                    {suggestions.map(suggestion => (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className: suggestion.active
                            ? "suggestion-item active"
                            : "suggestion-item",
                          style: suggestion.active ? activeStyle : inactiveStyle
                        })}
                      >
                        {suggestion.description}
                      </div>
                    ))}
                  </div>
                </Fragment>
              )}
            </PlacesAutocomplete>

            <input
              className="form-input"
              type="number"
              id={`${inputID}_lat`}
              value={latLng.lat}
              hidden={true}
              onChange={e => this.handleLatChange(e)}
            />
            <input
              className="form-input"
              type="number"
              id={`${inputID}_lon`}
              value={latLng.lng}
              hidden={true}
              onChange={e => this.handleLonChange(e)}
            />
          </div>
        </InputIconWrap>
        <GoogleMaps marker={latLng} />
      </Fragment>
    )
  }
}
