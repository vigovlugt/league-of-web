import Player from "../entities/Player";
import NetworkManager from "./NetworkManager";
import WebSocket from "ws";
import GameObjectManager from "./GameObjectManager";

const TICKS = 64;

export default class GameManager {
  public static instance: GameManager;

  public networkManager: NetworkManager;
  public gameObjectManager: GameObjectManager;

  private updateInterval: NodeJS.Timeout | null = null;

  private lastUpdate: number = Date.now();

  constructor() {
    GameManager.instance = this;

    this.networkManager = new NetworkManager();
    this.gameObjectManager = new GameObjectManager();

    this.networkManager.on("connection", (socket: WebSocket) =>
      this.onJoin(socket)
    );
  }

  onJoin(socket: WebSocket) {
    const player = new Player(10, 10, socket);

    this.gameObjectManager.create(player);

    this.start();

    console.log("JOIN: ", player.id);
    this.logState();
  }

  start() {
    if (this.updateInterval !== null) return;
    this.lastUpdate = Date.now();
    this.updateInterval = setInterval(
      () => this.update((Date.now() - this.lastUpdate) / 1000),
      1000 / TICKS
    );
  }

  update(delta: number) {
    this.gameObjectManager.getGameObjects().forEach((go) => go.update(delta));

    this.sendState();

    this.lastUpdate = Date.now();
  }

  sendState() {
    this.networkManager.send("STATE", {
      gameObjects: this.gameObjectManager.serialize(),
    });
  }

  logState() {
    console.log("--------------------------");
    console.log(this.gameObjectManager.getPlayers().length, "PLAYERS");
    console.log("--------------------------");
  }
}
