import Component from "./Component";
import GameObject from "../entities/GameObject";
import IVector2 from "../interfaces/IVector";
import { getDirection, normalize, getDistance } from "../utils/vectors";

type Target = IVector2 | GameObject | null;

export default class MoveComponent extends Component {
  private speed: number;

  private target: Target = null;

  constructor(go: GameObject, speed: number) {
    super(go);
    this.speed = speed;
  }

  public setTarget(target: Target) {
    this.target = target;
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

  public getTranslation(delta: number) {
    if (this.target == null) return { x: 0, y: 0 };

    const targetPosition = this.getTargetPosition()!;
    const direction = getDirection(this.gameObject.position, targetPosition);
    const normalized = normalize(direction);

    let translationX = this.speed * delta * normalized.x;
    // Do not overshoot target
    if (Math.abs(translationX) > Math.abs(direction.x)) {
      translationX = direction.x;
    }
    let translationY = this.speed * delta * normalized.y;
    if (Math.abs(translationY) > Math.abs(direction.y)) {
      translationY = direction.y;
    }

    return { x: translationX, y: translationY };
  }

  public update(delta: number) {
    if (this.target == null) return;

    const translation = this.getTranslation(delta);

    this.gameObject.position.x += translation.x;
    this.gameObject.position.y += translation.y;

    this.checkAtTarget();
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
      return true;
    }

    return false;
  }
}
