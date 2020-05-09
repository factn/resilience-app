/**
 *
 * @param {string} src : src of the script
 * @param {string} position : position of the script in the document
 * @param {script id} id: the unique id of the script
 */
export function loadScript(src, position, id) {
  if (!position) {
    return;
  }
  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

/**
 *
 * @param {React.useRef} ref: the ref of the element
 */
export function loadGoogleMapScript(ref) {
  if (typeof window !== "undefined" && !ref.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyCSoFTBQBHAieWPysOgygJ6W8cIVcjMjak&libraries=places",
        document.querySelector("head"),
        "google-maps"
      );
    }
    ref.current = true;
  }
}
