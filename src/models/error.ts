export class CustomError {
  private code: number;
  private message: string;

  /**
   * Constructor
   * @param code code of the error
   * @param message message
   */
  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

  /**
   * Getter $code
   * @return {number}
   */
  public get $code(): number {
    return this.code;
  }

  /**
   * Getter $message
   * @return {string}
   */
  public get $message(): string {
    return this.message;
  }
}
