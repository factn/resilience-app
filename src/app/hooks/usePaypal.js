import { useState, useEffect } from "react";

// We will eventually want to grab this from the organizer profile
const CLIENT_ID =
  "Ad1Pa9GwWvgzjeuVDMuRUm76rmIi2_5uXvEb4VJbAgkk0UFW8fUB-oFOpiTGphXaPOtRrwHvm-YrGGSN";
const PAYPAL_SCRIPT = `https://www.paypal.com/sdk/js?client-id=sb`;

/**
 * usePaypal
 *
 * @returns {false | object} the paypal object or false if it has not loaded yet
 */
export default function usePaypal() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if paypal has already been loaded
    if (window.paypal) {
      setLoaded(true);
      return;
    }

    const scriptElement = document.createElement("script");
    scriptElement.src = PAYPAL_SCRIPT;
    document.body.appendChild(scriptElement);

    scriptElement.onload = () => setLoaded(true);
  }, []);

  return loaded ? window.paypal : false;
}
