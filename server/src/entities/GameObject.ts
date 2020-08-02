import { v4 as uuidv4 } from "uuid";
import GameManager from "../managers/GameManager";
import IVector2 from "../interfaces/IVector";
import Component from "../components/Component";
import { EventEmitter } from "events";

export default class GameObject extends EventEmitter {
  public id: string;
  public type: string;

  public position: IVector2;

  private components: Component[] = [];

  protected spawned: boolean = false;

  constructor(type: string, position: IVector2) {
    super();
    this.id = uuidv4();

    this.type = type;

    this.position = position;
  }

  public addComponent<T extends Component>(component: T): T {
    this.components.push(component);
    return component;
  }

  public getComponent<T extends Component>(constr: {
    new (...args: any[]): T;
  }): T | undefined {
    const component = this.components.find((c) => c instanceof constr);

    if (component == undefined) {
      return component;
    }

    return component as T;
  }

  public fixedUpdate(delta: number) {
    this.components.forEach((c) => c.fixedUpdate(delta));
  }

  public update(delta: number) {
    this.components.forEach((c) => c.update(delta));
  }

  public serialize() {
    const { id, type, position } = this;

    let serialized = { id, type, position };

    this.components.forEach((c) => {
      serialized = { ...serialized, ...c.serialize() };
    });

    return serialized;
  }

  public spawn() {
    this.spawned = true;
    GameManager.gameObjectManager.create(this);
  }

  public destroy() {
    this.spawned = false;
    GameManager.gameObjectManager.remove(this.id);
  }
}
