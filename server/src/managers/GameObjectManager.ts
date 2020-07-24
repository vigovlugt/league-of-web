import GameObject from "../entities/GameObject";

export default class GameObjectManager {
  private gameObjects: GameObject[] = [];

  public getAll() {
    return this.gameObjects;
  }

  public get(id: string) {
    return this.gameObjects.find((go) => go.id === id);
  }

  public create(gameObject: GameObject) {
    this.gameObjects.push(gameObject);
  }

  public remove(id: string) {
    this.gameObjects = this.gameObjects.filter((go) => go.id !== id);
  }

  public getPlayers() {
    return this.gameObjects.filter((go) => go.type === "PLAYER");
  }

  public serialize() {
    return this.gameObjects.map((go) => go.serialize());
  }
}
