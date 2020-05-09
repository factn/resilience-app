/**
 *
 * @param {string} src : src of the script
 * @param {string} position : position of the script in the document
 * @param {script id} id: the unique id of the script
 */
export default function loadScript({ handleOnLoad, id, position, src }) {
  if (!position) {
    return;
  }
  const scriptElement = document.createElement("script");
  scriptElement.setAttribute("async", "");
  scriptElement.setAttribute("id", id);
  scriptElement.src = src;
  position.appendChild(scriptElement);
  scriptElement.onload = handleOnLoad;
  return scriptElement;
}
