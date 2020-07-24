import { DisplayObject, Container, InteractionEvent } from "pixi.js";
import { IVector2 } from "../interfaces/IVector";
import IGameObject from "../interfaces/IGameObject";
import GameManager from "../managers/GameManager";

export default class GameObject {
  public id: string;
  public type: string;
  public position: IVector2;

  public sprite: DisplayObject;

  public targetable: boolean = false;

  protected gameManager: new () => GameManager = GameManager;

  constructor({ id, type, position }: IGameObject) {
    this.id = id;
    this.type = type;
    this.position = position;
    this.sprite = new DisplayObject();
  }

  spawn(container: Container) {
    container.addChild(this.sprite);
    if (this.targetable) {
      this.sprite.interactive = true;
    }
  }

  onTarget(event: InteractionEvent) {
    if (this.id === GameManager.networkManager.playerId) return;
    console.log("ATTACK");
    GameManager.networkManager.send("ATTACK", { target: this.id });
  }

  sync(go: IGameObject) {
    this.position.x = this.sprite.x = go.position.x;
    this.position.y = this.sprite.y = go.position.y;
  }

  destroy() {
    this.sprite.destroy();
  }
}
