export default class PlayerBaseStats {
  public movementSpeed: number;

  public attackRange: number;
  public attackSpeed: number;
  public attackDamage: number;
  public isMeelee: boolean;

  public health: number;

  constructor(ddragonStats: { [key: string]: number }) {
    this.movementSpeed = ddragonStats.movespeed;

    this.attackRange = ddragonStats.attackrange;
    this.attackSpeed = ddragonStats.attackspeed;
    this.attackDamage = ddragonStats.attackdamage;
    this.isMeelee = this.attackRange > 200;

    this.health = ddragonStats.hp;
  }
}
