import Projectile from "../../../Projectile";
import GameObject from "../../../GameObject";
import IVector2 from "../../../../interfaces/IVector";
import BodyComponent from "../../../../components/BodyComponent";
import HealthComponent from "../../../../components/HealthComponent";
import Champion from "../../../Champion";
import StatModifier from "../../../../models/stats/StatModifier";

const DAMAGE = 60;
const RANGE = 1000;

export default class LucentSingularity extends Projectile {
  onGround: boolean = false;

  constructor(source: GameObject, target: IVector2) {
    super(source, target, {
      radius: 150,
      speed: 1400,
      collides: false,
      targeted: true,
      range: RANGE,
    });

    this.moveComponent.on("ARRIVE", () => this.onArrive());
  }

  onArrive() {
    this.emit("ARRIVE");
    this.onGround = true;
    this.collides = true;
  }

  update() {
    // const colliding = this.bodyComponent.getCollidingGameObjects();
    // colliding.forEach((go)=>{
    //   const bodyComponent.
    //   if(go.getComponent(BodyComponent)){
    //     if()
    //   }
    // })
  }

  explode() {
    this.bodyComponent.getCollidingGameObjects().forEach((go) => {
      const healthComponent = go.getComponent(HealthComponent);
      if (healthComponent) {
        healthComponent.onDamage(go, DAMAGE);
      }

      if (go instanceof Champion) {
        go.stats.movementSpeed.addModifier(new StatModifier(0, 0.75, 1));
      }
    });
    this.destroy();
  }
}
