import { useEffect, useState } from "react";
import loadScript from "../utils/loadScript";

/**
 * useGoogleMapApi
 *
 * @returns {false | true} google map api is loaded
 */
export default function useGoogleMapApi() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if paypal has already been loaded
    if (document.querySelector("#google-maps")) {
      setLoaded(true);
      return;
    }

    const key = "AIzaSyCSoFTBQBHAieWPysOgygJ6W8cIVcjMjak";
    const scriptSrc = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
    async function load() {
      loadScript({
        src: scriptSrc,
        position: document.querySelector("head"),
        id: "google-maps",
        handleOnLoad: () => {
          setLoaded(true);
        },
      });
    }

    load();
  }, []);

  return loaded;
}
