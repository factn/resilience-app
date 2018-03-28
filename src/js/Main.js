/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';

// Local JS
import Ad from './Ad';
import AdHeader from './AdHeader';
import Loader from './Loader';
/*** [end of imports] ***/

export default class Main extends Component {
	render () {
		let { contextChange,
					databaseReady,
					database,
					userRole,
					openModalFunction,
					closeMapPicker,
					settings } = this.props;
		
		return (
			<main className="app-main">
				<AdHeader contextChange={contextChange} />
				{databaseReady
					? <section className="ad-feed-wrap">
							{database.map(scenario =>
								<Ad scenario={scenario}
										openModalFunction={openModalFunction}
										context={userRole}
										key={scenario.id} />
							)}
						</section>
					: <Loader />
				}
			</main>
		);
	}
}