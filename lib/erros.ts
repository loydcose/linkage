export class ReadableError extends Error {
  constructor(message?: string) {
    super(message); // Pass the message to the Error constructor
    this.name = "ReadableError"; // Set the name of the error

    // This line is needed to restore the correct prototype chain.
    // (see note below)
    Object.setPrototypeOf(this, ReadableError.prototype);
  }
}
