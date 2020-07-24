import Component from "./Component";
import GameObject from "../entities/GameObject";
import HealthComponent from "./HealthComponent";

export default class AttackComponent extends Component {
  protected damage: number;
  constructor(go: GameObject, damage: number) {
    super(go);
    this.damage = damage;
  }

  attack(go: GameObject) {
    const healthComponent = go.getComponent(HealthComponent);
    if (healthComponent) {
      healthComponent.onDamage(this.gameObject, this.damage);
    }
  }
}
