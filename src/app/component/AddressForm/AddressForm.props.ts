import { RouteComponentProps } from "react-router-dom";

import PropTypes from "../../types/PropType";

type ErrorCallback = (errorMessage: string) => void;
type AddressFormProps = {
  addresses: string[];
  mission: PropTypes<Object, "valueOf">;
  history: PropTypes<RouteComponentProps, "history">;
  onError: ErrorCallback;
};

export default AddressFormProps;
