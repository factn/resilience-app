/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
// https://github.com/fullstackreact/google-maps-react
import { Map, Marker, GoogleApiWrapper } from "google-maps-react"

// Local JS
import Database from "../resources/Database"
/*** [end of imports] ***/

class MiniMap extends Component {
	constructor(props) {
		super(props)

		this.state = {
			markerShown: false,
			markerPos: {
				lat: this.props.initialCenter.lat,
				lng: this.props.initialCenter.lng
			}
		}

		this.mapClicked = this.mapClicked.bind(this)
	}

	componentDidMount = () => {
		this.setState({
			markerPos: this.props.initialCenter
		})
	}

	mapClicked(mapProps, map, clickEvent) {
		let json = {
			data: {
				type: "users",
				id: 1,
				attributes: {
					latitude: clickEvent.latLng.lat().toString(),
					longitude: clickEvent.latLng.lng().toString()
				}
			}
		}

		this.setState({
			markerPos: {
				lat: clickEvent.latLng.lat(),
				lng: clickEvent.latLng.lng()
			}
		})

		Database.updateUser({ id: 1 }, json)
			.then(result => {
				console.log("User successfully updated:", result)
			})
			.catch(error => {
				console.error("Error updating user:", error)
			})
	}

	render() {
		const { google, initialCenter, pins } = this.props

		return (
			<section className="mini-map-wrap">
				<Map
					google={google}
					zoom={pins ? 12 : 14}
					initialCenter={initialCenter}
					onClick={this.mapClicked}
				>
					<Marker position={this.state.markerPos} />
					{pins &&
						pins.map((_pin, _index) => <Marker key={_index} position={_pin} />)}
				</Map>
			</section>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyD9GQB7QNscXRebrSUzzNf8s5XGrzJSj0w"
})(MiniMap)
