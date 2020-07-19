import { v4 as uuidv4 } from "uuid";
import GameManager from "../managers/GameManager";

export default class GameObject {
  public id: string;

  public type: string;

  public x: number;
  public y: number;

  constructor(type: string, x: number, y: number) {
    this.id = uuidv4();

    this.type = type;

    this.x = x;
    this.y = y;
  }

  public serialize() {
    const { id, type, x, y } = this;
    return {
      id,
      type,
      x,
      y,
    };
  }

  public update(delta: number) {}

  public destroy() {
    GameManager.instance.gameObjectManager.remove(this.id);
  }
}
