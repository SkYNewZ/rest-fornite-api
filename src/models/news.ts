export class FortniteNews {
  private common: object;
  private br: Array<{
    image: string;
    _type: string;
    title: string;
    body: string;
  }>;
  private loginmessage: object;
  private survivalmessage: object;

  /**
   * Getter $common
   * @return {object}
   */
  public get $common(): object {
    return this.common;
  }

  /**
   * Getter $loginmessage
   * @return {object}
   */
  public get $loginmessage(): object {
    return this.loginmessage;
  }

  /**
   * Getter $survivalmessage
   * @return {object}
   */
  public get $survivalmessage(): object {
    return this.survivalmessage;
  }
}
