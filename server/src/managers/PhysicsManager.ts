import { Engine, Vector, Body, World } from "matter-js";

export default class PhysicsManager {
  engine: Engine;
  constructor() {
    this.engine = Engine.create();

    this.engine.world.gravity.y = 0;
  }

  addBody(body: Body) {
    World.addBody(this.engine.world, body);
  }

  update(delta: number) {
    Engine.update(this.engine, delta * 1000);
  }
}
