export class FortniteUser {
  private id: number;
  private displayName: string;
  private platform: string;
  /**
   * Constructor
   * @param platform
   */
  constructor(platform: string) {
    this.platform = platform;
  }

  /**
   * Getter $id
   * @return {number}
   */
  public get $id(): number {
    return this.id;
  }
  /**
   * Setter $id
   * @param {number} value
   */
  public set $id(value: number) {
    this.id = value;
  }

  /**
   * Getter $displayName
   * @return {string}
   */
  public get $displayName(): string {
    return this.displayName;
  }

  /**
   * Setter $displayName
   * @param {string} value
   */
  public set $displayName(value: string) {
    this.displayName = value;
  }

  /**
   * Getter $platform
   * @return {string}
   */
  public get $platform(): string {
    return this.platform;
  }

  /**
   * Setter $platform
   * @param {string} value
   */
  public set $platform(value: string) {
    this.platform = value;
  }
}
