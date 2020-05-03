class AddressesUnresolvedError extends Error {
  public readonly erroredAddressIndices: number[] = [];

  constructor(message: string, failedIndices: number[]) {
    super(message);

    this.name = "AddressesUnresolvedError";
    this.erroredAddressIndices = failedIndices;
  }
}

export default AddressesUnresolvedError;
