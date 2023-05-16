class HttpError extends Error {
  constructor(message:string, errorCode:any) {
    super(message);
    // @ts-ignore
    this.code = errorCode;
  }
}

export default HttpError;
