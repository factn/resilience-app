/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"
import faSolid from "@fortawesome/fontawesome-free-solid"

// Local JS
import Modal from "./Modal"
/*** [end of imports] ***/

export default class ModalWrap extends Component {
	render() {
		let {
			closeModal,
			openModalName,
			modalContent,
			lat,
			lon,
			openMapPicker
		} = this.props

		return (
			<section className="modal-wrap">
				<button
					className="modal-close-btn btn-lite"
					onClick={() => closeModal()}
				>
					<span>Close </span>
					<Icon icon="times" />
				</button>

				{typeof modalContent !== "undefined" && (
					<Modal
						name={openModalName}
						content={modalContent}
						openMapPicker={openMapPicker}
						lat={lat}
						lon={lon}
					/>
				)}
			</section>
		)
	}
}
