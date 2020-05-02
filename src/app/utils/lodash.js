import _ from "lodash";
import * as baseRandomColor from "./randomColor";

const getQueryParam = (key) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
};
const setQueryParam = (name, value, search) => {
  search = search ? search : window.location.search;
  let urlParams = new URLSearchParams(search);
  urlParams.set(name, value);
  return urlParams.toString();
};

const randomColor = (str) => {
  if (!str) return "lightgrey";
  return baseRandomColor({ seed: str });
};

_.mixin({
  getQueryParam,
  setQueryParam,
  randomColor,
});

export default _;
