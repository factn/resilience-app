/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"
import brands from "@fortawesome/fontawesome-free-brands"

// Local JS
import Database from "../resources/Database"
/*** [end of imports] ***/

export default class Profile extends Component {
	constructor(props) {
		super(props)

		this.state = {
			honey: false,
			donations: false,
			tasks: false,
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
				console.info("Donations call complete:", result.body.data)
				this.setState({
					userDonations: result.body.data
				})
			})
			.catch(error => {
				console.error("Error getting donations:", error)
				this.setState({
					userDonations: null
				})
			})

		Database.getUserDos(json)
			.then(result => {
				console.info("Dos call complete:", result.body.data)
				this.setState({
					userDos: result.body.data
				})
			})
			.catch(error => {
				console.error("Error getting dos:", error)
				this.setState({
					userDos: null
				})
			})

		Database.getUserRequests(json)
			.then(result => {
				console.info("Requests call complete:", result.body.data)
				this.setState({
					userRequests: result.body.data
				})
			})
			.catch(error => {
				console.error("Error getting requests:", error)
				this.setState({
					userRequests: null
				})
			})

		Database.getUserVerifications(json)
			.then(result => {
				console.info("Verifications call complete:", result.body.data)
				this.setState({
					userVerifications: result.body.data
				})
			})
			.catch(error => {
				console.error("Error getting verifications:", error)
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
				tasks: false,
				requests: false,
				verifications: false
			})
		} else {
			this.setState({
				honey: articleName === "honey",
				donations: articleName === "donations",
				tasks: articleName === "tasks",
				requests: articleName === "requests",
				verifications: articleName === "verifications"
			})
		}
	}

	render() {
		return (
			<section className="profile">
				<article
					className={
						this.state.honey ? "profile-article open" : "profile-article"
					}
					onClick={() => this.toggleArticle("honey")}
				>
					<header className="profile-article-header">
						<h4>Honey</h4>
						{this.state.honey ? (
							<Icon className="profile-icon" icon="caret-up" />
						) : (
							<Icon className="profile-icon" icon="caret-down" />
						)}
					</header>
					<div className="profile-content-wrap">
						<div className="social-shares">
							<div className="facebook-social-share social-share-box">
								{/* <Icon icon="facebook" /> */}
								<span className="social-share-amount" />
							</div>
							<div className="twitter-social-share social-share-box">
								{/* <Icon icon="twitter" /> */}
								<span className="social-share-amount" />
							</div>
							<div className="instagram-social-share social-share-box">
								{/* <Icon icon="instagram" /> */}
								<span className="social-share-amount" />
							</div>
						</div>
					</div>
				</article>
				<article
					className={
						this.state.donations ? "profile-article open" : "profile-article"
					}
					onClick={() => this.toggleArticle("donations")}
				>
					<header className="profile-article-header">
						<h4>Donations</h4>
						{this.state.donations ? (
							<Icon className="profile-icon" icon="caret-up" />
						) : (
							<Icon className="profile-icon" icon="caret-down" />
						)}
					</header>
					<div className="profile-content-wrap" />
				</article>
				<article
					className={
						this.state.tasks ? "profile-article open" : "profile-article"
					}
					onClick={() => this.toggleArticle("tasks")}
				>
					<header className="profile-article-header">
						<h4>Tasks</h4>
						{this.state.tasks ? (
							<Icon className="profile-icon" icon="caret-up" />
						) : (
							<Icon className="profile-icon" icon="caret-down" />
						)}
					</header>
					<div className="profile-content-wrap" />
				</article>
				<article
					className={
						this.state.requests ? "profile-article open" : "profile-article"
					}
					onClick={() => this.toggleArticle("requests")}
				>
					<header className="profile-article-header">
						<h4>Requests</h4>
						{this.state.requests ? (
							<Icon className="profile-icon" icon="caret-up" />
						) : (
							<Icon className="profile-icon" icon="caret-down" />
						)}
					</header>
					<div className="profile-content-wrap" />
				</article>
				<article
					className={
						this.state.verifications
							? "profile-article open"
							: "profile-article"
					}
					onClick={() => this.toggleArticle("verifications")}
				>
					<header className="profile-article-header">
						<h4>Verifications</h4>
						{this.state.verifications ? (
							<Icon className="profile-icon" icon="caret-up" />
						) : (
							<Icon className="profile-icon" icon="caret-down" />
						)}
					</header>
					<div className="profile-content-wrap" />
				</article>
			</section>
		)
	}
}
