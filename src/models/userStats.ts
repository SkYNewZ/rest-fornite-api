import { FortniteStats } from "./stats";
import { FortniteUser } from "./user";

export class UserStats {
  private group: FortniteStats;
  private duo: FortniteStats;
  private squad: FortniteStats;
  private info: FortniteUser;
  private lifetimeStats: FortniteStats;

  /**
   * Getter $group
   * @return {FortniteStats}
   */
  public get $group(): FortniteStats {
    return this.group;
  }

  /**
   * Setter $group
   * @param {FortniteStats} value
   */
  public set $group(value: FortniteStats) {
    this.group = value;
  }

  /**
   * Getter $duo
   * @return {FortniteStats}
   */
  public get $duo(): FortniteStats {
    return this.duo;
  }

  /**
   * Setter $duo
   * @param {FortniteStats} value
   */
  public set $duo(value: FortniteStats) {
    this.duo = value;
  }

  /**
   * Getter $squad
   * @return {FortniteStats}
   */
  public get $squad(): FortniteStats {
    return this.squad;
  }

  /**
   * Setter $squad
   * @param {FortniteStats} value
   */
  public set $squad(value: FortniteStats) {
    this.squad = value;
  }

  /**
   * Getter $info
   * @return {FortniteUser}
   */
  public get $info(): FortniteUser {
    return this.info;
  }

  /**
   * Setter $info
   * @param {FortniteUser} value
   */
  public set $info(value: FortniteUser) {
    this.info = value;
  }

  /**
   * Getter $lifetimeStats
   * @return {FortniteStats}
   */
  public get $lifetimeStats(): FortniteStats {
    return this.lifetimeStats;
  }

  /**
   * Setter $lifetimeStats
   * @param {FortniteStats} value
   */
  public set $lifetimeStats(value: FortniteStats) {
    this.lifetimeStats = value;
  }
}
