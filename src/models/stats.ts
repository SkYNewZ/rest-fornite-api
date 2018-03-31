export class FortniteStats {
  private wins: number;
  private top3: number;
  private top5: number;
  private top6: number;
  private top10: number;
  private top12: number;
  private top25: number;
  private ratioKillDeath: number;
  private winrate: number;
  private matches: number;
  private kills: number;
  private timePlayed: string;
  private killsPerMatch: number;
  private killsPerMin: number;

  /**
   * Getter $wins
   * @return {number}
   */
  public get $wins(): number {
    return this.wins;
  }

  /**
   * Getter $top3
   * @return {number}
   */
  public get $top3(): number {
    return this.top3;
  }

  /**
   * Getter $top5
   * @return {number}
   */
  public get $top5(): number {
    return this.top5;
  }

  /**
   * Getter $top6
   * @return {number}
   */
  public get $top6(): number {
    return this.top6;
  }

  /**
   * Getter $top10
   * @return {number}
   */
  public get $top10(): number {
    return this.top10;
  }

  /**
   * Getter $top12
   * @return {number}
   */
  public get $top12(): number {
    return this.top12;
  }

  /**
   * Getter $top25
   * @return {number}
   */
  public get $top25(): number {
    return this.top25;
  }

  /**
   * Getter $ratioKillDeath
   * @return {number}
   */
  public get $ratioKillDeath(): number {
    return this.ratioKillDeath;
  }

  /**
   * Getter $winrate
   * @return {number}
   */
  public get $winrate(): number {
    return this.winrate;
  }

  /**
   * Getter $matches
   * @return {number}
   */
  public get $matches(): number {
    return this.matches;
  }

  /**
   * Getter $kills
   * @return {number}
   */
  public get $kills(): number {
    return this.kills;
  }

  /**
   * Getter $timePlayed
   * @return {string}
   */
  public get $timePlayed(): string {
    return this.timePlayed;
  }

  /**
   * Getter $killsPerMatch
   * @return {number}
   */
  public get $killsPerMatch(): number {
    return this.killsPerMatch;
  }

  /**
   * Getter $killsPerMin
   * @return {number}
   */
  public get $killsPerMin(): number {
    return this.killsPerMin;
  }
}
