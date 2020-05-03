import { useEffect, useState } from "react";
import { Organization } from "../model";

const getScript = (clientId) =>
  `https://www.paypal.com/sdk/js?client-id=${clientId}&components=buttons,funding-eligibility`;

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

    async function load() {
      const { clientId } = await Organization.getPaymentSettings();

      const paypalScript = getScript(clientId);
      const scriptElement = document.createElement("script");

      scriptElement.src = paypalScript;
      document.body.appendChild(scriptElement);

      scriptElement.onload = () => setLoaded(true);
    }

    load();
  }, []);

  return loaded ? window.paypal : false;
}
