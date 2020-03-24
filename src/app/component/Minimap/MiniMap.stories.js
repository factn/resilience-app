import React from "react";
import { storiesOf } from "@storybook/react";
import MiniMap from './MiniMap';

storiesOf("Components | Button", module)
  .add("Map - Small", () => (
    <MiniMap size="small"/>
  ))
  .add("Map - Medium", () =>  <MiniMap size="medium"/>)
  .add("Map - large", () =>  <MiniMap size="large"/>)