import Projectile from "../../../Projectile";
import GameObject from "../../../GameObject";
import IVector2 from "../../../../interfaces/IVector";
import HealthComponent from "../../../../components/HealthComponent";
import Champion from "../../../Champion";
import StatModifier from "../../../../models/stats/StatModifier";

export default class LightBinding extends Projectile {
  constructor(source: GameObject, direction: IVector2) {
    super(source, direction, {
      radius: 140 / 2,
      speed: 1200,
      range: 1300,
    });
  }

  onCollide(go: GameObject) {
    super.onCollide(go);

    const healthComponent = go.getComponent(HealthComponent);
    if (healthComponent) {
      healthComponent.onDamage(this.source, 60);
    }

    if (go instanceof Champion) {
      go.stats.movementSpeed.addModifier(new StatModifier(0, 0, 2));
    }

    if (this.hitGameObjects.length >= 2) {
      this.destroy();
    }
  }
}
