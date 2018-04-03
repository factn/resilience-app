/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"

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
					<Icon icon="chevron-left" />
					<span className="modal-close-text"> Back</span>
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
