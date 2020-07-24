import GameObject from "./GameObject";
import IVector2 from "../interfaces/IVector";
import MoveComponent from "../components/MoveComponent";
import HealthComponent from "../components/HealthComponent";

const SPEED = 1000;

export default class AutoAttack extends GameObject {
  private source: GameObject;
  private target: GameObject;
  private damage: number;

  private moveComponent: MoveComponent;

  constructor(source: GameObject, target: GameObject, damage: number) {
    super("AUTOATTACK", { ...source.position });

    this.source = source;
    this.target = target;
    this.damage = damage;

    this.moveComponent = new MoveComponent(this, 1000);
    this.addComponent(this.moveComponent);
    this.moveComponent.setTarget(target);
  }

  update(delta: number) {
    super.update(delta);

    if (this.moveComponent.checkAtTarget() == true && this.target) {
      const healthComponent = this.target.getComponent(HealthComponent);
      if (healthComponent) {
        healthComponent.onDamage(this.source, this.damage);
      }
      this.destroy();
    }
  }
}
