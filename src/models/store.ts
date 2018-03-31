import { StoreFront } from "./storefront";

export class FortniteStore {
  private refreshIntervalHrs: number;
  private dailyPurchaseHrs: number;
  private expiration: string;
  private storefronts: StoreFront[];

  /**
   * Getter $refreshIntervalHrs
   * @return {number}
   */
  public get $refreshIntervalHrs(): number {
    return this.refreshIntervalHrs;
  }

  /**
   * Getter $dailyPurchaseHrs
   * @return {number}
   */
  public get $dailyPurchaseHrs(): number {
    return this.dailyPurchaseHrs;
  }

  /**
   * Getter $expiration
   * @return {string}
   */
  public get $expiration(): string {
    return this.expiration;
  }

  /**
   * Getter $storefronts
   * @return {StoreFront[]}
   */
  public get $storefronts(): StoreFront[] {
    return this.storefronts;
  }
}
