import Component from "./Component";
import GameObject from "../entities/GameObject";
import { Body, Query } from "matter-js";

export default class BodyComponent extends Component {
  public body: Body;
  constructor(go: GameObject, body: Body) {
    super(go);
    this.body = body;

    Body.setPosition(this.body, this.gameObject.position);

    this.body.frictionAir = 1;
  }

  update() {
    this.gameObject.position.x = this.body.position.x;
    this.gameObject.position.y = this.body.position.y;
  }

  isColliding(go: GameObject) {
    const bodyComponent = go.getComponent(BodyComponent);
    if (bodyComponent == null) {
      return false;
    }

    return Query.collides(this.body, [bodyComponent.body]).length > 0;
  }

  serialize() {
    return { radius: this.body.circleRadius };
  }
}
