/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"
import faBrands from "@fortawesome/fontawesome-free-brands"
/*** [end of imports] ***/

export default class Profile extends Component {
	render() {
		let { userData } = this.props

		return (
			<section className="profile">
				<article className="profile-article">
					<header className="profile-article-header">
						<h4>Karma</h4>
					</header>
					<div className="social-shares">
						<div className="facebook-social-share social-share-box">
							<Icon icon="facebook" />
							<span className="social-share-amount" />
						</div>
						<div className="twitter-social-share social-share-box">
							<Icon icon="twitter" />
							<span className="social-share-amount" />
						</div>
						<div className="instagram-social-share social-share-box">
							<Icon icon="instagram" />
							<span className="social-share-amount" />
						</div>
					</div>
				</article>
				<article className="profile-article">
					<header className="profile-article-header">
						<h4>Donations</h4>
					</header>
				</article>
				<article className="profile-article">
					<header className="profile-article-header">
						<h4>Tasks</h4>
					</header>
				</article>
				<article className="profile-article">
					<header className="profile-article-header">
						<h4>Requests</h4>
					</header>
				</article>
				<article className="profile-article">
					<header className="profile-article-header">
						<h4>Verifications</h4>
					</header>
				</article>
			</section>
		)
	}
}
