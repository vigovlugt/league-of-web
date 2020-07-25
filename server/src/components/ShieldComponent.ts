import Component from "./Component";
import GameObject from "../entities/GameObject";
import Shield from "../models/effects/shields/Shield";

export default class ShieldComponent extends Component {
  private shields: Shield[] = [];
  constructor(go: GameObject) {
    super(go);
  }

  public getShield() {
    let shield = 0;
    this.shields.forEach((s) => (shield += s.currentShield));
    return shield;
  }

  public hasShield() {
    return this.shields.length > 0;
  }

  public addShield(source: GameObject, shield: number, duration: number = 0) {
    this.shields.push(new Shield(this, source, shield, duration));
  }

  public removeShield(shield: Shield) {
    this.shields = this.shields.filter((s) => s !== shield);
  }

  public getBySource(source: GameObject) {
    return this.shields.find((s) => s.source === source);
  }

  public onDamage(source: GameObject, damage: number): number {
    let remainingDamage = damage;

    // Loop over newest shields first
    [...this.shields].reverse().forEach((shield) => {
      // If there is remaining damage to deal to shields
      if (remainingDamage > 0) {
        remainingDamage = shield.onDamage(damage);
        // If there is no remaining damage return 0
        if (remainingDamage === 0) {
          return 0;
        }
      }
    });
    return remainingDamage;
  }

  public update(delta: number) {
    this.shields.forEach((s) => s.update(delta));
  }

  serialize() {
    return {
      shield: this.getShield(),
    };
  }
}
