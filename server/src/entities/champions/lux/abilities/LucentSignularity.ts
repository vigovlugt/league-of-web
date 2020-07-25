import Projectile from "../../../Projectile";
import GameObject from "../../../GameObject";
import IVector2 from "../../../../interfaces/IVector";
import HealthComponent from "../../../../components/HealthComponent";
import Champion from "../../../Champion";
import StatModifier from "../../../../models/stats/StatModifier";

export default class LucentSingularity extends Projectile {
  onGround: boolean = false;

  constructor(source: GameObject, target: IVector2) {
    super(source, target, {
      radius: 150,
      speed: 1400,
      collides: false,
      targeted: true,
    });

    this.moveComponent.on("ARRIVE", () => this.onArrive());
  }

  onArrive() {
    this.onGround = true;
  }
}
