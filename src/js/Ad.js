/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
/*** [end of imports] ***/

export default class Ad extends Component {
	constructor(props) {
		super(props)

		this.state = {
			xTransform: 0,
			touchStartX: 0,
			lastTouchX: 0,
			style: { transform: `translateX(0) rotateY(0deg) scale(1)` },
			swipeActive: false,
			threshold: 32,
			transitionTiming: 100
		}

		this.handleTouchStart = this.handleTouchStart.bind(this)
		this.handleTouchMove = this.handleTouchMove.bind(this)
		this.handleTouchEnd = this.handleTouchEnd.bind(this)
	}

	handleTouchStart = e => {
		this.setState({
			touchStartX: e.targetTouches[0].clientX,
			style: {
				transform: `translateX(0) rotateY(0deg) scale(1.05)`,
				zIndex: 10
			},
			swipeActive: true
		})
	}
	handleTouchMove = e => {
		let { touchStartX } = this.state
		let currentTouchX = e.targetTouches[0].clientX
		let windowWidth = window.innerWidth
		let xDif = currentTouchX - touchStartX

		this.setState({
			xTransform: xDif,
			lastTouchX: currentTouchX,
			style: {
				transform: `translateX(${xDif}px) rotateY(${90 *
					(xDif / windowWidth)}deg) scale(1.05)`
			}
		})
	}
	handleTouchEnd = e => {
		let { touchStartX, lastTouchX, threshold, transitionTiming } = this.state

		let {
			scenario,
			context,
			openModal,
			dismissAd,
			verb,
			requester_firstname,
			noun
		} = this.props

		let xDif = lastTouchX === 0 ? 0 : lastTouchX - touchStartX

		if (Math.abs(xDif) > threshold) {
			if (touchStartX < lastTouchX) {
				this.setState({
					style: {
						transform: "translateX(100%) rotateY(45deg) scale(1)",
						marginBottom: "-10rem" // Currently this is an approximation of the element height
					}
				})
				setTimeout(() => {
					openModal(
						context,
						scenario.attributes,
						`${verb}-${requester_firstname}-${noun}`
					)
				}, transitionTiming)
			} else {
				this.setState({
					style: {
						transform: "translateX(-100%) rotateY(-45deg) scale(1)",
						marginBottom: "-10rem" // Currently this is an approximation of the element height
					}
				})
				// return dismissAd(id)
			}
		} else {
			this.setState({
				style: {
					transform: `translateX(0) rotateY(0deg) scale(1)`,
					zIndex: 10
				} // Default
			})
		}
	}

	callToActionBuild = requestType => {
		if (requestType === "doer") return <span>Help today</span>
		else if (requestType === "donator") return <span>Donate now</span>
		else if (requestType === "verifier") return <span>Verify user</span>
		else if (requestType === "requester") return <span>Get Help</span>
	}

	render() {
		let {
			scenario,
			context, // doer, donator, verifier, requester
			openModal,
			dismissAd
		} = this.props

		let {
			// doer_firstname,
			// doer_lastname,
			requester_firstname,
			// requester_lastname,
			// funding_goal,
			disaster,
			// doerlat,
			// doerlon,
			// requestorlat,
			// requestorlon,
			donated,
			image,
			// imagethumb,
			noun,
			verb
		} = scenario.attributes

		let { style, swipeActive } = this.state

		return (
			<article
				className={
					swipeActive ? `ad ${context}-ad swipe-active` : `ad ${context}-ad`
				}
				style={style}
				onTouchStart={e => this.handleTouchStart(e)}
				onTouchMove={e => this.handleTouchMove(e)}
				onTouchEnd={e => this.handleTouchEnd(e)}
			>
				<figure className="ad-image-wrap">
					<img src={image} alt={disaster} className="ad-image" />
					<p className="ad-image-caption">{disaster}</p>
				</figure>
				<header className="ad-header">
					<h4 className="ad-title">
						{
							<span>{`Can you ${verb} ${noun} for ${toFirstCap(
								requester_firstname
							)}?`}</span>
						}
					</h4>
					<h5 className="ad-subtitle">{<span>{`${donated} funded`}</span>}</h5>
				</header>
				<button
					className="btn ad-modal-btn"
					onClick={() =>
						openModal(
							context,
							scenario.attributes,
							`${verb}-${requester_firstname}-${noun}`
						)
					}
				>
					{this.callToActionBuild(context)}
				</button>
			</article>
		)
	}
}

const toFirstCap = str => str.charAt(0).toUpperCase() + str.slice(1)
