export class FortnitePrice {
  private currencyType: string;
  private currencySubType: string;
  private regularPrice: number;
  private finalPrice: number;
  private saleExpiration: string;
  private basePrice: number;

  /**
   * Getter $currencyType
   * @return {string}
   */
  public get $currencyType(): string {
    return this.currencyType;
  }

  /**
   * Getter $currencySubType
   * @return {string}
   */
  public get $currencySubType(): string {
    return this.currencySubType;
  }

  /**
   * Getter $regularPrice
   * @return {number}
   */
  public get $regularPrice(): number {
    return this.regularPrice;
  }

  /**
   * Getter $finalPrice
   * @return {number}
   */
  public get $finalPrice(): number {
    return this.finalPrice;
  }

  /**
   * Getter $saleExpiration
   * @return {string}
   */
  public get $saleExpiration(): string {
    return this.saleExpiration;
  }

  /**
   * Getter $basePrice
   * @return {number}
   */
  public get $basePrice(): number {
    return this.basePrice;
  }
}
