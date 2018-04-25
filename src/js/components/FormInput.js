/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"

// Local JS
import Image from "./inputs/Image"
import Location from "./inputs/Location"
import Select from "./inputs/Select"
import Submit from "./inputs/Submit"
import Text from "./inputs/Text"
/*** [end of imports] ***/

export default class FormInput extends Component {
  render() {
    const { openMapPicker, lat, lon, scenarioId, inputObj } = this.props
    const { inputType } = inputObj

    if (inputType === "image") return <Image />
    else if (inputType === "location") {
      return (
        <Location
          inputObj={inputObj}
          openMapPicker={openMapPicker}
          lat={lat}
          lon={lon}
        />
      )
    } else if (inputType === "select") return <Select inputObj={inputObj} />
    else if (inputType === "submit")
      return <Submit inputObj={inputObj} scenarioId={scenarioId} />
    else if (inputType === "hr") return <hr />
    else return <Text inputObj={inputObj} />
  }
}
