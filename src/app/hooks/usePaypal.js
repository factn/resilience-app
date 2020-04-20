import { useEffect, useState } from "react";

// We will eventually want to grab this from the organizer profile
const CLIENT_ID = "sb";
const PAYPAL_SCRIPT = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`;

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
