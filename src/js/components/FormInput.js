/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"

// Local JS
import Checkbox from "./inputs/Checkbox"
import CustomInput from "./inputs/CustomInput"
import File from "./inputs/File"
import Location from "./inputs/Location"
import RadioRow from "./inputs/RadioRow"
import Select from "./inputs/Select"
import SplitInput from "./inputs/SplitInput"
import Submit from "./inputs/Submit"
import Text from "./inputs/Text"
/*** [end of imports] ***/

export default class FormInput extends Component {
  render() {
    const { openMapPicker, lat, lon, scenarioId, inputObj } = this.props
    const { inputType, disabledField, customJSX } = inputObj

    if (inputType === "checkbox") return <Checkbox inputObj={inputObj} />
    else if (inputType === "custom")
      return <CustomInput disabledField={disabledField} content={customJSX} />
    else if (inputType === "file") return <File inputObj={inputObj} />
    else if (inputType === "location") {
      return (
        <Location
          inputObj={inputObj}
          openMapPicker={openMapPicker}
          lat={lat}
          lon={lon}
        />
      )
    } else if (inputType === "radio-row")
      return <RadioRow inputObj={inputObj} />
    else if (inputType === "select") return <Select inputObj={inputObj} />
    else if (inputType === "split-input")
      return <SplitInput inputObj={inputObj} />
    else if (inputType === "submit")
      return <Submit inputObj={inputObj} scenarioId={scenarioId} />
    else if (inputType === "hr") return <hr />
    else return <Text inputObj={inputObj} />
  }
}
