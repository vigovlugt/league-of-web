import GameObject from "../entities/GameObject";
import IGameObject from "../interfaces/IGameObject";
import NetworkManager from "./NetworkManager";
import { Application, DisplayObject } from "pixi.js";
import Champion from "../entities/Champion";
import AutoAttack from "../entities/AutoAttack";
import IChampion from "../interfaces/IChampion";
import GameManager from "./GameManager";
import Projectile from "../entities/Projectile";

export default class GameObjectManager {
  private gameObjects: GameObject[] = [];

  private app: Application;
  private networkManager: NetworkManager;

  constructor(app: Application, networkManager: NetworkManager) {
    this.app = app;
    this.networkManager = networkManager;

    this.networkManager.on("STATE", (data: { gameObjects: IGameObject[] }) =>
      this.sync(data.gameObjects)
    );
  }

  getBySprite(sprite: DisplayObject) {
    return this.gameObjects.find((go) => go.sprite == sprite);
  }

  private sync(syncGameObjects: IGameObject[]) {
    const deletedGameObjects = this.gameObjects.filter(
      (gameObj) => !syncGameObjects.find((go) => go.id === gameObj.id)
    );
    deletedGameObjects.forEach((go) => this.destroy(go));

    const newGameObjects = syncGameObjects.filter(
      (gameObj) => !this.gameObjects.find((go) => go.id === gameObj.id)
    );
    newGameObjects.forEach((go) => this.spawn(go));

    const updateGameObjects = this.gameObjects.map((go) => ({
      local: go,
      server: syncGameObjects.find((go2) => go2.id === go.id)!,
    }));
    updateGameObjects.forEach((set) => this.update(set));
  }

  private spawn(go: IGameObject) {
    console.log("SPAWN", go.type);
    let gameObject;
    switch (go.type) {
      case "CHAMPION":
        const isLocalPlayer = this.networkManager.playerId === go.id;

        gameObject = new Champion(go as IChampion, isLocalPlayer);
        break;
      case "AUTOATTACK":
        gameObject = new AutoAttack(go);
        break;
      case "PROJECTILE":
        gameObject = new Projectile(go);
        break;
    }

    if (gameObject) {
      gameObject.spawn(this.app.stage);
      this.gameObjects.push(gameObject);
    } else {
      console.warn(`Game Object ${go.type} not defined`);
    }
  }

  private update({
    local,
    server,
  }: {
    local: GameObject;
    server: IGameObject;
  }) {
    local.sync(server);
  }

  private destroy(go: GameObject) {
    this.gameObjects = this.gameObjects.filter((g) => g.id !== go.id);
    go.destroy();
  }
}
