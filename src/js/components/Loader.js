/*** IMPORTS ***/
// Module imports
import React from "react"
import Icon from "@fortawesome/react-fontawesome"
/*** [end of imports] ***/

const Loader = () => (
	<div className="loader-wrap">
		<div className="loader">
			<Icon icon="circle" className="loader-icon" />
			<Icon icon="circle" className="loader-icon" />
			<Icon icon="circle" className="loader-icon" />
		</div>
	</div>
)

export default Loader
