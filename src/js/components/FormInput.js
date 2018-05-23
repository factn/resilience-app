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

    if (inputType === "image") {
      return <Image />
    } else if (inputType === "select") {
      return <Select {...inputObj} />
    } else if (inputType === "submit") {
      return <Submit scenarioId={scenarioId} {...inputObj} />
    } else if (inputType === "hr") {
      return <hr />
    } else if (inputType === "location") {
      return <Location openMapPicker={openMapPicker} lat={lat} lon={lon} {...inputObj} />
    }

    return <Text {...inputObj} />
  }
}
