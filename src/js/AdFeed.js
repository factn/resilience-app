/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';
/*** [end of imports] ***/

export default class AdFeed extends Component {
	render () {
		let { adlist } = this.props;

		return (
			<section className="ad-feed-wrap">
				{adlist.map(_index =>
					<article className="ad" key={_index}>
					</article>
				)}
			</section>
		);
	}
}