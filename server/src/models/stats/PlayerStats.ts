import PlayerBaseStats from "./PlayerBaseStats";
import GameManager from "../../managers/GameManager";

export default class PlayerStats {
  public base: PlayerBaseStats;

  constructor(champion: string) {
    const ddragonData = GameManager.dataManager.getChampionStats(champion);
    this.base = new PlayerBaseStats(ddragonData);
  }

  getMovementSpeed() {
    return this.base.movementSpeed;
  }

  getAttackRange() {
    return this.base.attackRange;
  }

  getAttackSpeed() {
    return this.base.attackSpeed;
  }

  getAttackDamage() {
    return this.base.attackDamage;
  }

  getAttackTime() {
    return 1 / this.getAttackSpeed();
  }
}
