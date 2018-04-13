/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"
import brands from "@fortawesome/fontawesome-free-brands"

// Local JS
import Database from "../resources/Database"
import MiniScenario from "./MiniScenario"
/*** [end of imports] ***/

export default class Profile extends Component {
	constructor(props) {
		super(props)

		this.state = {
			honey: false,
			donations: false,
			dos: false,
			requests: false,
			verifications: false,
			userDonations: null,
			userDos: null,
			userRequests: null,
			userVerifications: null
		}
	}

	componentDidMount = () => {
		let json = { id: this.props.userId }

		Database.getUserDonations(json)
			.then(result => {
				// console.info("Donations call complete:", result.body.data)
				this.setState({
					userDonations: result.body.data
				})
			})
			.catch(error => {
				// console.error("Error getting donations:", error)
				this.setState({
					userDonations: null
				})
			})

		Database.getUserDos(json)
			.then(result => {
				// console.info("Dos call complete:", result.body.data)
				this.setState({
					userDos: result.body.data
				})
			})
			.catch(error => {
				// console.error("Error getting dos:", error)
				this.setState({
					userDos: null
				})
			})

		Database.getUserRequests(json)
			.then(result => {
				// console.info("Requests call complete:", result.body.data)
				this.setState({
					userRequests: result.body.data
				})
			})
			.catch(error => {
				// console.error("Error getting requests:", error)
				this.setState({
					userRequests: null
				})
			})

		Database.getUserVerifications(json)
			.then(result => {
				// console.info("Verifications call complete:", result.body.data)
				this.setState({
					userVerifications: result.body.data
				})
			})
			.catch(error => {
				// console.error("Error getting verifications:", error)
				this.setState({
					userVerifications: null
				})
			})
	}

	toggleArticle = articleName => {
		if (this.state[articleName]) {
			this.setState({
				honey: false,
				donations: false,
				dos: false,
				requests: false,
				verifications: false
			})
		} else {
			this.setState({
				honey: articleName === "honey",
				donations: articleName === "donations",
				dos: articleName === "dos",
				requests: articleName === "requests",
				verifications: articleName === "verifications"
			})
		}
	}

	render() {
		const {
			userDonations,
			userDos,
			userRequests,
			userVerifications,
			honey,
			donations,
			dos,
			requests,
			verifications
		} = this.state

		return (
			<section className="profile">
				<article className={honey ? "profile-article open" : "profile-article"}>
					<header
						className="profile-article-header"
						onClick={() => this.toggleArticle("honey")}
					>
						<h4>Honey</h4>
						{honey ? (
							<Icon className="profile-icon" icon="caret-up" />
						) : (
							<Icon className="profile-icon" icon="caret-down" />
						)}
					</header>
				</article>
				<article
					className={donations ? "profile-article open" : "profile-article"}
				>
					<header
						className="profile-article-header"
						onClick={() => this.toggleArticle("donations")}
					>
						<h4>Donations ({userDonations ? userDonations.length : 0})</h4>
						{donations ? (
							<Icon className="profile-icon" icon="caret-up" />
						) : (
							<Icon className="profile-icon" icon="caret-down" />
						)}
					</header>
					{userDonations && (
						<div className="profile-content-wrap">
							{userDonations.map(scenario => (
								<MiniScenario
									key={scenario.id}
									id={scenario.id}
									{...scenario.attributes}
								/>
							))}
						</div>
					)}
				</article>
				<article className={dos ? "profile-article open" : "profile-article"}>
					<header
						className="profile-article-header"
						onClick={() => this.toggleArticle("dos")}
					>
						<h4>Tasks ({userDos ? userDos.length : 0})</h4>
						{dos ? (
							<Icon className="profile-icon" icon="caret-up" />
						) : (
							<Icon className="profile-icon" icon="caret-down" />
						)}
					</header>
					{userDos && (
						<div className="profile-content-wrap">
							{userDos.map(scenario => (
								<MiniScenario
									key={scenario.id}
									id={scenario.id}
									{...scenario.attributes}
								/>
							))}
						</div>
					)}
				</article>
				<article
					className={requests ? "profile-article open" : "profile-article"}
				>
					<header
						className="profile-article-header"
						onClick={() => this.toggleArticle("requests")}
					>
						<h4>Requests ({userRequests ? userRequests.length : 0})</h4>
						{requests ? (
							<Icon className="profile-icon" icon="caret-up" />
						) : (
							<Icon className="profile-icon" icon="caret-down" />
						)}
					</header>
					{userRequests && (
						<div className="profile-content-wrap">
							{userRequests.map(scenario => (
								<MiniScenario
									key={scenario.id}
									id={scenario.id}
									{...scenario.attributes}
								/>
							))}
						</div>
					)}
				</article>
				<article
					className={verifications ? "profile-article open" : "profile-article"}
				>
					<header
						className="profile-article-header"
						onClick={() => this.toggleArticle("verifications")}
					>
						<h4>
							Verifications ({userVerifications ? userVerifications.length : 0})
						</h4>
						{verifications ? (
							<Icon className="profile-icon" icon="caret-up" />
						) : (
							<Icon className="profile-icon" icon="caret-down" />
						)}
					</header>
					{userVerifications && (
						<div className="profile-content-wrap">
							{userVerifications.map(scenario => (
								<MiniScenario
									key={scenario.id}
									id={scenario.id}
									{...scenario.attributes}
								/>
							))}
						</div>
					)}
				</article>
			</section>
		)
	}
}
