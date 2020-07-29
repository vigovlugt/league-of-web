import GameObject from "./GameObject";
import IVector2 from "../interfaces/IVector";
import MoveComponent from "../components/MoveComponent";
import HealthComponent from "../components/HealthComponent";
import Stat from "../models/stats/Stat";
import BodyComponent from "../components/BodyComponent";
import { Bodies } from "matter-js";

const SPEED = 1000;

export default class AutoAttack extends GameObject {
  private source: GameObject;
  private target: GameObject;
  private damage: number;

  private bodyComponent: BodyComponent;
  private moveComponent: MoveComponent;

  constructor(source: GameObject, target: GameObject, damage: number) {
    super("AUTOATTACK", { ...source.position });

    this.source = source;
    this.target = target;
    this.damage = damage;
    this.bodyComponent = this.addComponent(
      new BodyComponent(this, Bodies.circle(0, 0, 10, { isSensor: true }))
    );
    this.moveComponent = new MoveComponent(
      this,
      this.bodyComponent,
      new Stat(SPEED)
    );
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
