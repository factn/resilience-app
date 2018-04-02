/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"

// Local JS
import Ad from "./Ad"
import AdHeader from "./AdHeader"
import Loader from "./Loader"
import FormInput from "./FormInput"
/*** [end of imports] ***/

export default class Main extends Component {
	render() {
		let { app } = this.props

		return (
			<main
				className={
					typeof this.props.adContent !== "undefined"
						? "page-adcontent-wrap page app-main"
						: "page app-main"
				}
			>
				{this.props.pageStyle === "modal" ? (
					<Fragment>
						{typeof this.props.adContent !== "undefined" &&
							this.props.adContent}
						<div
							className={`${this.props.title
								.toString()
								.toLowerCase()}-form page-form`}
						>
							{typeof this.props.inputs !== "undefined" &&
								this.props.inputs.map((_input, _index) => (
									<FormInput
										formName={this.props.title}
										inputObj={_input}
										openMapPicker={app.openMapPicker}
										lat={app.state.lastClickedLat}
										lon={app.state.lastClickedLon}
										key={_index}
									/>
								))}
						</div>
					</Fragment>
				) : (
					<Fragment>
						<AdHeader contextChange={app.onContextChange} />
						{app.state.databaseReady ? (
							<section className="ad-feed-wrap">
								{app.state.scenarioData.map(scenario => (
									<Ad
										scenario={scenario}
										openModal={app.openModal}
										dismissAd={app.dismissAd}
										context={app.userRole}
										key={scenario.id}
									/>
								))}
							</section>
						) : (
							<Loader />
						)}
					</Fragment>
				)}
			</main>
		)
	}
}
