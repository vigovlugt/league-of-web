import GameObject from "../entities/GameObject";
import { EventEmitter } from "events";

export default class Component extends EventEmitter {
  protected gameObject: GameObject;

  constructor(go: GameObject) {
    super();
    this.gameObject = go;
  }

  update(delta: number) {}

  serialize(): Object {
    return {};
  }
}
