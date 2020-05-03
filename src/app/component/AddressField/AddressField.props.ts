import { ChangeEvent } from "react";

type ChangeCallback = (event: ChangeEvent<HTMLInputElement>) => void;
type DeleteCallback = () => void;

export enum AddressFieldMode {
  Outline = "outline",
  Normal = "normal",
}

type AddressFieldProps = {
  id: string;
  label: string;
  mode: AddressFieldMode;
  value?: string;
  error?: string;
  onChange?: ChangeCallback;
  onDelete?: DeleteCallback;
};

export default AddressFieldProps;
