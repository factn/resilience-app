/*** IMPORTS ***/
// Local JS
import Page from "./Page"
/*** [end of imports] ***/

export default class VerifierTab extends Page {
	constructor(props) {
		super(props)

		this.state = {
			title: "Verify",
			pageStyle: "home-tab",
			navMenu: true,
			userId: 1
		}
	}
}
