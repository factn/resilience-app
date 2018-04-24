/*** IMPORTS ***/
// Local JS
import Page from "./Page"
/*** [end of imports] ***/

export default class Info extends Page {
	constructor(props) {
		super(props)

		this.state = {
			pageStyle: "flow",
			title: "Overview",
			navMenu: true,
			userId: 1,
			scenarioId: this.props.match.params.scenarioId || 1,
      role: this.props.match.params.role || "Info",
			tab: this.props.match.params.tab || "Overview"
		}
	}
}
