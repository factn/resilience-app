import React from "react";
import MiniMap from "./MiniMap";
import { withKnobs, text } from "@storybook/addon-knobs";

export const mapSize = () => {
  const addressLoc = text("address", "55 St Catherine St E");
  const sizeIt = text("Size", "small");

  return <MiniMap size={sizeIt} address={addressLoc} />;
};

export default {
  title: "Components | Map",
  decorator: [withKnobs],
};
