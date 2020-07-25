import GameObject from "./GameObject";
import MoveComponent from "../components/MoveComponent";
import IVector2 from "../interfaces/IVector";
import { getDistance, constrainRange } from "../lib/vectors";
import GameManager from "../managers/GameManager";
import CollisionComponent from "../components/CollisionComponent";
import Stat from "../models/stats/Stat";
import HealthComponent from "../components/HealthComponent";

export interface IProjectile {
  radius: number;
  speed: number;
  range?: number;
  collides?: boolean;
  collidesWithSource?: boolean;
  targeted?: boolean;
}

export default class Projectile extends GameObject implements IProjectile {
  public source: GameObject;
  // Direction or target
  public vector: IVector2;

  protected moveComponent: MoveComponent;
  protected collisionComponent: CollisionComponent;

  public radius: number;
  public speed: number;
  public range?: number;
  collides: boolean;
  public collidesWithSource: boolean;

  protected startPosition: IVector2;
  protected hitGameObjects: GameObject[] = [];

  constructor(
    source: GameObject,
    vector: IVector2,
    {
      radius,
      speed,
      range,
      collides = true,
      collidesWithSource = false,
      targeted = false,
    }: IProjectile
  ) {
    super("PROJECTILE", { ...source.position });
    this.startPosition = { ...this.position };

    this.source = source;

    if (targeted && range != null) {
      this.vector = constrainRange(vector, this.source.position, range);
    } else {
      this.vector = vector;
    }

    this.radius = radius;
    this.speed = speed;
    this.range = range;
    this.collides = collides;
    this.collidesWithSource = collidesWithSource;

    this.moveComponent = new MoveComponent(this, new Stat(this.speed));
    this.addComponent(this.moveComponent);
    if (!targeted) {
      this.moveComponent.setDirection(this.vector);
    } else {
      this.moveComponent.setDirection(this.vector);
    }

    this.collisionComponent = this.addComponent(
      new CollisionComponent(this, this.radius)
    );
  }

  update(delta: number) {
    super.update(delta);

    if (
      this.range &&
      this.range < getDistance(this.startPosition, this.position)
    ) {
      this.onOutOfRange();
    }

    if (this.collides) {
      let collidingGameObjects = GameManager.gameObjectManager
        .getAll()
        .filter(
          (go) =>
            go != this &&
            (this.collidesWithSource ? true : go != this.source) &&
            !this.hitGameObjects.includes(go) &&
            go.getComponent(HealthComponent) != null &&
            this.collisionComponent.isColliding(go)
        );

      collidingGameObjects.forEach((go) => this.onCollide(go));
    }
  }

  onCollide(go: GameObject) {
    this.hitGameObjects.push(go);
  }

  onOutOfRange() {
    this.destroy();
  }

  resetHitGameObjects() {
    this.hitGameObjects = [];
  }
}
