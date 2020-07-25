import IGameObject from "../interfaces/IGameObject";
import GameObject from "./GameObject";
import { Graphics } from "pixi.js";
import GameManager from "../managers/GameManager";

export default class AutoAttack extends GameObject {
  constructor(target: IGameObject) {
    super(target);

    const graphics = new Graphics();

    graphics.lineStyle(3, 0xffffff, 1);
    graphics.beginFill(0, 0);
    graphics.drawCircle(0, 0, 20);
    graphics.endFill();

    this.sprite = graphics;
  }
}
