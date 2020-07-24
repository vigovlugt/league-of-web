import IGameObject from "../interfaces/IGameObject";
import GameObject from "./GameObject";
import { Graphics } from "pixi.js";
import setPivotCenter from "../utils/sprite";

export default class Projectile extends GameObject {
  constructor(go: IGameObject) {
    super(go);

    const graphics = new Graphics();

    graphics.lineStyle(1, 0, 1);
    graphics.beginFill(0xffffff);
    graphics.drawCircle(0, 0, go.radius!);
    graphics.endFill();

    this.sprite = graphics;
  }
}
