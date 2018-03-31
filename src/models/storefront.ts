import { CatalogEntry } from "./catalogEntry";

export class StoreFront {
  private name: string;
  private CatalogEntries: CatalogEntry[];

  /**
   * Getter $name
   * @return {string}
   */
  public get $name(): string {
    return this.name;
  }

  /**
   * Setter $name
   * @param {string} value
   */
  public set $name(value: string) {
    this.name = value;
  }

  /**
   * Getter $catalogEntries
   * @return {CatalogEntry[]}
   */
  public get $catalogEntries(): CatalogEntry[] {
    return this.CatalogEntries;
  }

  /**
   * Setter $catalogEntries
   * @param {CatalogEntry[]} value
   */
  public set $catalogEntries(value: CatalogEntry[]) {
    this.CatalogEntries = value;
  }
}
