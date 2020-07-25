import Component from "./Component";
import GameObject from "../entities/GameObject";
import IVector2 from "../interfaces/IVector";
import { getDirection, normalize, getDistance } from "../lib/vectors";
import Target from "../types/Target";
import Stat from "../models/stats/Stat";

export default class MoveComponent extends Component {
  private speed: Stat;

  private target: Target = null;

  private direction: IVector2 | null = null;

  constructor(go: GameObject, speed: Stat) {
    super(go);
    this.speed = speed;
  }

  public setTarget(target: Target) {
    this.direction = null;
    this.target = target;
  }

  public setDirection(direction: IVector2 | null) {
    this.target = null;
    this.direction = direction != null ? normalize(direction) : null;
  }

  public getTarget() {
    return this.target;
  }

  private getTargetPosition(): IVector2 | null {
    if (this.target == null) {
      return null;
    }

    if (this.target instanceof GameObject) {
      return this.target.position;
    }

    return this.target;
  }

  public getDirectionTranslation(delta: number) {
    if (this.direction == null) return { x: 0, y: 0 };

    return {
      x: this.direction.x * this.speed.get() * delta,
      y: this.direction.y * this.speed.get() * delta,
    };
  }

  public getTargetTranslation(delta: number) {
    if (this.target == null) return { x: 0, y: 0 };

    const targetPosition = this.getTargetPosition()!;
    const direction = getDirection(this.gameObject.position, targetPosition);
    const normalized = normalize(direction);

    let translationX = this.speed.get() * delta * normalized.x;
    // Do not overshoot target
    if (Math.abs(translationX) > Math.abs(direction.x)) {
      translationX = direction.x;
    }

    let translationY = this.speed.get() * delta * normalized.y;
    if (Math.abs(translationY) > Math.abs(direction.y)) {
      translationY = direction.y;
    }

    return { x: translationX, y: translationY };
  }

  public update(delta: number) {
    let translation;
    if (this.target != null) {
      translation = this.getTargetTranslation(delta);
    } else if (this.direction != null) {
      translation = this.getDirectionTranslation(delta);
    }

    if (translation == null) {
      return;
    }

    this.gameObject.position.x += translation.x;
    this.gameObject.position.y += translation.y;

    if (this.target != null) {
      this.checkAtTarget();
    }
  }

  public checkAtTarget() {
    if (this.target == null) {
      return true;
    }

    const distance = getDistance(
      this.gameObject.position,
      this.getTargetPosition()!
    );

    if (distance < 0.1) {
      this.setTarget(null);
      this.emit("ARRIVE");
      return true;
    }

    return false;
  }
}
