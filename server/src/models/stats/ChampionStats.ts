import ChampionBaseStats from "./ChampionBaseStats";
import GameManager from "../../managers/GameManager";
import Stat from "./Stat";

export default class ChampionStats {
  public base: ChampionBaseStats;

  movementSpeed: Stat;
  attackRange: Stat;
  attackDamage: Stat;
  attackSpeed: Stat;

  constructor(champion: string) {
    const ddragonData = GameManager.dataManager.getChampionStats(champion);
    this.base = new ChampionBaseStats(ddragonData);

    this.movementSpeed = new Stat(this.base.movementSpeed);
    this.attackRange = new Stat(this.base.attackRange);
    this.attackSpeed = new Stat(this.base.attackSpeed);
    this.attackDamage = new Stat(this.base.attackDamage);
  }

  getAttackTime() {
    return 1 / this.attackSpeed.get();
  }

  update(delta: number) {
    this.movementSpeed.update(delta);
    this.attackRange.update(delta);
    this.attackDamage.update(delta);
    this.attackSpeed.update(delta);
  }
}
