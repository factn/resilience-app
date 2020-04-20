/**
 * Takes fullName as string and converts to First/Last name
 * by assuming the last word is the last name and everything before the
 * last name is the first name.  Returns an array [firstName, lastName]
 * Example:  'Joseph J. J. Shmoseph' => ['Joseph J. J.', 'Shmoseph']
 * This is a naive solution, it can't handle suffixes like Jr.
 * @param {string} fullName
 * @function
 */
export const convertFullName = (fullName) => {
  let firstName = "";
  let lastName = "";
  if (fullName) {
    const parts = fullName.split(" ");
    lastName = parts[parts.length - 1];
    if (parts.length > 1) {
      firstName = parts.slice(0, parts.length - 1).join(" ");
    }
  }
  return [firstName, lastName];
};

/**
 * Takes a location object provided by the Angolia location selector
 * and converts it to fit the model field
 * @param {object} location { address, countryCode, county, lat, long }
 * @function
 */
export const normalizeLocation = (location) => {
  if (!location) return location;
  const { address, countryCode, county, lat, long } = location;
  return { address, lat, long, label: `${countryCode.toUpperCase()} - ${county}` };
};
