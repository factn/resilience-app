/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"

// Local JS
import Ad from "./Ad"
import AdHeader from "./AdHeader"
import AdModalContent from "./AdModalContent"
import Loader from "./Loader"
import Form from "./Form"
/*** [end of imports] ***/

export default class Main extends Component {
	render() {
		let {
			pageStyle,
			title,
			attributes,
			openMapPicker,
			lastClickedLat,
			lastClickedLon,
			tabs,
			flows,
			databaseReady,
			scenarioData,
			lastUrlSegment,
			updateScenario,
			funcs
		} = this.props

		if (pageStyle === "modal") {
			return (
				<main className="page app-main modal-page">
					<Form
						title={title}
						openMapPicker={openMapPicker}
						lastClickedLat={lastClickedLat}
						lastClickedLon={lastClickedLon}
						lastUrlSegment={lastUrlSegment}
						updateScenario={updateScenario}
						funcs={funcs}
					/>
				</main>
			)
		} else if (pageStyle === "home-tab") {
			return (
				<main className="page app-main home-tab-page">
					<AdHeader {...tabs} />
					{databaseReady ? (
						<section className="ad-feed-wrap">
							{scenarioData.map(scenario => (
								<Ad
									scenario={scenario}
									lastUrlSegment={lastUrlSegment}
									key={scenario.id}
								/>
							))}
						</section>
					) : (
						<Loader />
					)}
				</main>
			)
		} else {
			// Flow
			return (
				<main className="page app-main page-adcontent-wrap">
					<AdModalContent {...attributes} />
					<Form
						title={flows[lastUrlSegment].title}
						openMapPicker={openMapPicker}
						lastClickedLat={lastClickedLat}
						lastClickedLon={lastClickedLon}
						lastUrlSegment={lastUrlSegment}
						updateScenario={updateScenario}
						funcs={funcs}
					/>
				</main>
			)
		}
	}
}
