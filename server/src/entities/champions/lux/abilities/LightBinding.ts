import Projectile from "../../../Projectile";
import GameObject from "../../../GameObject";
import IVector2 from "../../../../interfaces/IVector";
import HealthComponent from "../../../../components/HealthComponent";

export default class LightBinding extends Projectile {
  private hitGameObjects: GameObject[] = [];

  constructor(source: GameObject, direction: IVector2) {
    super(source, 140 / 2, 1200, 1300, direction);
  }

  onCollide(go: GameObject) {
    if (this.hitGameObjects.includes(go)) {
      return;
    }

    this.hitGameObjects.push(go);

    const healthComponent = go.getComponent(HealthComponent);
    if (healthComponent) {
      healthComponent.onDamage(this.source, 60);
    }

    if (this.hitGameObjects.length >= 2) {
      this.destroy();
    }
  }
}
