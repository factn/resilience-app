import _ from "lodash";

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

_.mixin({
  getQueryParam,
  setQueryParam,
});

export default _;
