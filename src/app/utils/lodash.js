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
/*!
 * Check if an element is out of the viewport
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}  elem The element to check
 * @return {Object}     A set of booleans for each side of the element
 */
const isOutOfViewport = (elem) => {
  // Get element's bounding
  var bounding = elem.getBoundingClientRect();

  // Check if it's out of the viewport on each side
  var out = {};
  out.top = bounding.top < 0;
  out.left = bounding.left < 0;
  out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
  out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
  out.any = out.top || out.left || out.bottom || out.right;
  out.all = out.top && out.left && out.bottom && out.right;

  return out;
};

_.mixin({
  getQueryParam,
  setQueryParam,
  randomColor,
  isOutOfViewport,
});

export default _;
