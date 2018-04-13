/*** IMPORTS ***/
// Local JS
import Page from "./Page"
/*** [end of imports] ***/

export default class DonatorTab extends Page {
	constructor(props) {
		super(props)

		this.state = {
			title: "Donate",
			pageStyle: "home-tab",
			navMenu: true,
			userId: 1
		}
	}
}
