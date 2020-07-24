import GameObject from "../entities/GameObject";

export default class Component {
  protected gameObject: GameObject;

  constructor(go: GameObject) {
    this.gameObject = go;
  }

  update(delta: number) {}

  serialize(): Object {
    return {};
  }
}
