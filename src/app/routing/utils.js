/**
 * Returns a URL path with placeholders replaced with given values
 * @param {string} link The path containing query parameter values
 * @param  {...any} replacements Any number of query parameters to replace with value
 * @example getLinkWithQuery('/missions/:id', { id: '123' }) => '/missions/123'
 */
export function getLinkWithQuery(link, ...replacements) {
  replacements.forEach((replacement) => {
    for (let key in replacement) {
      const queryKey = `:${key}`;
      link = link.replace(queryKey, replacement[key]);
    }
  });
  return link;
}
