import IGameObject from "../interfaces/IGameObject";
import GameObject from "./GameObject";
import { Graphics } from "pixi.js";

export default class Projectile extends GameObject {
  constructor(go: IGameObject) {
    super(go);

    const graphics = new Graphics();

    graphics.lineStyle(3, 0xffffff, 0.75);
    graphics.beginFill(0, 0);
    graphics.drawCircle(0, 0, go.radius!);
    graphics.endFill();

    this.sprite = graphics;
  }
}
