import GameObject from "./GameObject";
import MoveComponent from "../components/MoveComponent";
import IVector2 from "../interfaces/IVector";
import { getDistance } from "../lib/vectors";
import GameManager from "../managers/GameManager";
import CollisionComponent from "../components/CollisionComponent";

export default class Projectile extends GameObject {
  public source: GameObject;

  private moveComponent: MoveComponent;
  private collisionComponent: CollisionComponent;

  private range: number;
  private startPosition: IVector2;

  public collidesWithSource: boolean = false;

  constructor(
    source: GameObject,
    radius: number,
    speed: number,
    range: number,
    direction: IVector2
  ) {
    super("PROJECTILE", { ...source.position });
    this.startPosition = { ...this.position };

    this.source = source;
    this.range = range;

    this.moveComponent = new MoveComponent(this, speed);
    this.addComponent(this.moveComponent);
    this.moveComponent.setDirection(direction);

    this.collisionComponent = this.addComponent(
      new CollisionComponent(this, radius)
    );
  }

  update(delta: number) {
    super.update(delta);

    if (this.range < getDistance(this.startPosition, this.position)) {
      this.destroy();
    }

    const collidingGameObjects = GameManager.gameObjectManager
      .getAll()
      .filter(
        (go) =>
          go != this &&
          (!this.collidesWithSource ? go != this.source : true) &&
          this.collisionComponent.isColliding(go)
      )
      .forEach((go) => this.onCollide(go));
  }

  onCollide(go: GameObject) {}
}
