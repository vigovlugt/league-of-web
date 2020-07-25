import Component from "./Component";
import GameObject from "../entities/GameObject";
import ShieldComponent from "./ShieldComponent";

export default class HealthComponent extends Component {
  public maxHealth: number;
  public health: number;
  public dead: boolean = false;

  constructor(go: GameObject, maxHealth: number) {
    super(go);
    this.maxHealth = this.health = maxHealth;
  }

  public onDamage(source: GameObject, damage: number) {
    if (this.dead) return;

    const shieldComponent = this.gameObject.getComponent(ShieldComponent);
    if (shieldComponent) {
      // First subtract damage from shields
      damage = shieldComponent.onDamage(source, damage);
    }

    this.health -= damage;
    if (this.health <= 0) {
      this.dead = true;
      this.die();
    }
  }

  public die() {
    this.gameObject.destroy();
  }

  serialize() {
    return {
      health: this.health,
      maxHealth: this.maxHealth,
    };
  }
}
