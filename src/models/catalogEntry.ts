import { FortnitePrice } from "./price";

export class CatalogEntry {
  private devname: string;
  private offerid: string;
  private pricesarray: FortnitePrice[];

  /**
   * Constructor
   * @param devName
   * @param offerId
   * @param prices
   */
  constructor(devName: string, offerId: string, prices: FortnitePrice[]) {
    this.devname = devName;
    this.offerid = offerId;
    this.pricesarray = prices;
  }

  public get devName(): string {
    return this.devname;
  }

  public get offerId(): string {
    return this.offerid;
  }

  public get prices(): FortnitePrice[] {
    return this.pricesarray;
  }
}
