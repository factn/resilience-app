/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';
/*** [end of imports] ***/

export default class AdFeed extends Component {
	titleBuild = (noun, verb, firstName) => <span>{`Can you ${verb} a ${noun} for ${firstName}?`}</span>

	render () {
		let { adlist } = this.props;

		return (
			<section className="ad-feed-wrap">
				{adlist.map(_index =>
					<article className="ad" key={_index}>
						<header className="ad-header">
							<h4 className="ad-title">{this.titleBuild(adlist[_index].scenario.description.noun,
								adlist[_index].scenario.description.verb,
								adlist[_index].scenario.requester.first_name)}</h4>
							<h5 className="ad-subtitle">{adlist[_index].scenario}</h5>
						</header>
						<figure className="ad-image-wrap">
							<img src={adlist[_index].scenario.image.} alt="" className="ad-image"/>
							<figcaption className="ad-image-caption">
								<p></p>
							</figcaption>
						</figure>
					</article>
				)}
			</section>
		);
	}
}

// adlist[_index].scenario