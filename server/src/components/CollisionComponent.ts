import Component from "./Component";
import GameObject from "../entities/GameObject";
import { getDistance } from "../lib/vectors";

export default class CollisionComponent extends Component {
  private radius: number;

  constructor(go: GameObject, radius: number) {
    super(go);

    this.radius = radius;
  }

  isColliding(go: GameObject) {
    const collisionComponent = go.getComponent(CollisionComponent);
    if (collisionComponent == null) {
      return false;
    }

    const maxCollisionDistance = this.radius + collisionComponent.radius;

    const distance = getDistance(this.gameObject.position, go.position);

    return distance <= maxCollisionDistance;
  }

  serialize() {
    return { radius: this.radius };
  }
}
