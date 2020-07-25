import Projectile from "../../../Projectile";
import GameObject from "../../../GameObject";
import IVector2 from "../../../../interfaces/IVector";
import ShieldComponent from "../../../../components/ShieldComponent";

const SHIELD = 50;
const DURATION = 2.5;

export default class PrismaticBarrier extends Projectile {
  private returning: boolean = false;

  constructor(source: GameObject, direction: IVector2) {
    super(source, direction, {
      radius: 300 / 2,
      speed: 1400,
      range: 1075,
      collidesWithSource: true,
    });
  }

  onCollide(go: GameObject) {
    super.onCollide(go);

    const shieldComponent = go.getComponent(ShieldComponent);
    if (shieldComponent) {
      if (!this.returning) {
        shieldComponent.addShield(this, SHIELD, DURATION);
      } else {
        const existingShield = shieldComponent.getBySource(this);
        if (existingShield) {
          existingShield.addShield(SHIELD);
          existingShield.resetDuration();
        } else {
          shieldComponent.addShield(this, SHIELD, DURATION);
        }
      }
    }
  }

  onOutOfRange() {
    this.moveComponent.setTarget(this.source);
    this.resetHitGameObjects();
    this.returning = true;
    this.moveComponent.on("ARRIVE", () => {
      this.destroy();
    });
  }
}
