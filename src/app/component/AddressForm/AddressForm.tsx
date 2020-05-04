import { parse as urlParse, format as urlFormat } from "url";
import { stringify as queryStringify } from "querystring";
import AddressFormProps from './AddressForm.props';
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ShortestRouteResponse from "../../types/ShortestRouteResponse";
import ShortestRouteErrorResponse from "../../types/ShortestRouteErrorResponse";
import AddressesUnresolvedError from "../../types/AddressesUnresolvedError";
import ServerError from "../../types/ServerError";
import { Mission } from "../../model";

const AddressForm = (props: AddressFormProps) => {
 const DEFAULT_ERROR_MESSAGE = "Sorry, we were unable to fetch the shortest route for you.";
  
  const [addresses, addRoute] = useState([]);

function updateQueryParameters() {
let startAddress = Mission.Status.started ? props.mission.pickUplocation : {};
let endAddress = Mission.Status.started ? props.mission.deliverylocation : [];

    addRoute(addresses.concat(startAddress));
    addRoute(addresses.concat(endAddress));
    const addressQuery = "?" + createSearchString(addresses);
    const newUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      addressQuery;

    window.history.pushState(
      {
        path: newUrl,
      },
      "",
      newUrl
    );
  }

  function clearAllAddressErrors() {
    const [erroredAddressIndices, clearAll] = useState([]);
    clearAll(erroredAddressIndices.slice(0,erroredAddressIndices.length -1));
  }

  async function submitAddresses() {
    clearAllAddressErrors();
    updateQueryParameters();

    const rootServerUrlString = process.env.REACT_APP_COMMUNITYTECH_TSP_SERVER_URL;
    if (!rootServerUrlString) {
      showError(DEFAULT_ERROR_MESSAGE);
      return;
    }

    const addressesSearchString = createSearchString(addresses);

    const serverUrl = urlParse(rootServerUrlString);
    serverUrl.pathname = "/shortest-route";
    serverUrl.search = addressesSearchString;

    try {
      const serverUrlString = urlFormat(serverUrl);
      const serverResponse = await fetch(serverUrlString);
      await handleServerResponse(serverResponse);
    } catch (err) {
      let errorMessage = DEFAULT_ERROR_MESSAGE;
      if (err instanceof AddressesUnresolvedError) {
        errorMessage = err.message;
        ErroredAddressIndices(err.erroredAddressIndices);
      }

      showError(errorMessage);
    }
  }

  async function handleServerResponse(serverResponse: Response) {
    if (serverResponse.status === 200) {
      await handleSuccessResponse(serverResponse);
      return;
    }

    if (serverResponse.status === 400) {
      await handleBadRequestResponse(serverResponse);
      return;
    }

    handleServerErrorResponse(serverResponse);
  }

  async function handleSuccessResponse(serverResponse: Response) {
    const { order: shortestRouteOrder } = (await serverResponse.json()) as ShortestRouteResponse;

    const itineraryUrl = buildItineraryUrlString(shortestRouteOrder);
    props.history.push(itineraryUrl);
  }

  async function handleBadRequestResponse(serverResponse: Response) {
    const {
      erroredAddressIndices,
      message,
    } = (await serverResponse.json()) as ShortestRouteErrorResponse;

    const addressesUnresolvedError = new AddressesUnresolvedError(message, erroredAddressIndices);
    throw addressesUnresolvedError;
  }

  function handleServerErrorResponse(serverResponse: Response) {
    const serverError = new ServerError(DEFAULT_ERROR_MESSAGE);
    throw serverError;
  }

  function setErroredAddressIndices() {
    clearAllAddressErrors();
  }

  function createSearchString(addresses: string[], order?: number[]) {
    const addressesString = addresses.join("|");
    const queryObject = {
      addresses: addressesString,
      order: "",
    };

    if (order) queryObject.order = order.join(",");

    const addressesStringQuery = queryStringify(queryObject);
    return addressesStringQuery;
  }

  function buildItineraryUrlString(addressOrder: number[]) {
    const addressesStringQuery = createSearchString(addresses, addressOrder);

    const itineraryUrl = {
      pathname: "/itinerary",
      search: addressesStringQuery,
    };

    return urlFormat(itineraryUrl);
  }

  function showError(message: string) {
    if (props.onError) props.onError(message);
  }

  render() {
    
    return (
        <Button>
          variant="contained" color="primary" onClick={submitAddresses}
          disabled={addresses.length < 2}> Calculate itinerary
        </Button>
    );
  }
}


export default AddressForm;
