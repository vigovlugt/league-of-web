import GameObject from "../entities/GameObject";
import { EventEmitter } from "events";

export default class Component extends EventEmitter {
  protected gameObject: GameObject;

  constructor(go: GameObject) {
    super();
    this.gameObject = go;
  }

  fixedUpdate(delta: number) {}

  update(delta: number) {}

  serialize(): Object {
    return {};
  }
}
