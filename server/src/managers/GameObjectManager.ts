import GameObject from "../entities/GameObject";

export default class GameObjectManager {
  private gameObjects: GameObject[] = [];

  public getGameObjects() {
    return this.gameObjects;
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
