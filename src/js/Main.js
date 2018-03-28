/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';

// Local JS
import GoogleMaps from './GoogleMaps';
import Ad from './Ad';
/*** [end of imports] ***/

export default class Main extends Component {
	render () {
		let { userLoggedIn,
					database,
					openModalFunction,
					mapPickerIsOpen,
					closeMapPicker,
					settings } = this.props;
		
		let clas = "app-main";

		if (userLoggedIn)
			clas += " logged-in";

		if (mapPickerIsOpen)
			clas += " map-open";

		let style = {};
		
		if (userLoggedIn) {
			if (mapPickerIsOpen) {
				style = {
					top: document.documentElement.scrollTop,
					height: "100vh"
				};
			} else {
				style = {
					top: "-100vh",
					height: "100vh"
				};
			}
		} else {
			style = {
				top: 0,
				height: "calc(100vh - 2.5rem)"
			};
		}

		return (
			<main className={clas}>
				{userLoggedIn &&
					<section className="ad-feed-wrap">
						{database.map(scenario =>
							<Ad scenario={scenario}
								key={scenario}
								openModalFunction={openModalFunction}/>
						)}
					</section>
				}
				<section className="map-wrap" style={style}>
					<GoogleMaps zoomLevel={settings.zoomLevel}
						closeMapPicker={closeMapPicker} />
				</section>
			</main>
		);
	}
}