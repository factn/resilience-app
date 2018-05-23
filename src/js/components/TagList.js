/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
/*** [end of imports] ***/

const TagList = props => (
  <ul className="tag-list">{props.list && props.list.map((tag, _index) => <Tag {...tag} key={_index} />)}</ul>
)

class Tag extends Component {
  state = {
    active: this.props.active || false
  }

  toggleTag = () => {
    this.setState({
      active: !this.state.active
    })
  }

  render() {
    const { active } = this.state
    const { label, link } = this.props

    if (link) {
      return (
        <li className={active ? "tag active-tag" : "tag inactive-tag"}>
          <Link to={link} className="tag-link">
            #{label}
          </Link>
        </li>
      )
    } else {
      return (
        <li className={active ? "tag active-tag" : "tag inactive-tag"} onClick={this.toggleTag}>
          #{label}
        </li>
      )
    }
  }
}

export default TagList
