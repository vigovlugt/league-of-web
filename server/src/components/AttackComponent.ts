import Component from "./Component";
import GameObject from "../entities/GameObject";
import HealthComponent from "./HealthComponent";

export default class AttackComponent extends Component {
  protected damage: number;

  public attackCooldown: number = 0;

  constructor(go: GameObject, damage: number) {
    super(go);
    this.damage = damage;
  }

  canAttack() {
    return this.attackCooldown <= 0;
  }

  attack(go: GameObject) {
    if (!this.canAttack()) {
      return;
    }

    const healthComponent = go.getComponent(HealthComponent);
    if (healthComponent) {
      healthComponent.onDamage(this.gameObject, this.damage);
    }
  }

  update(delta: number) {
    if (this.attackCooldown > 0) {
      this.attackCooldown -= delta;
    }
  }
}
