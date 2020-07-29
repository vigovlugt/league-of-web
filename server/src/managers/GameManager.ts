import Champion from "../entities/Champion";
import NetworkManager from "./NetworkManager";
import GameObjectManager from "./GameObjectManager";
import DataManager from "./DataManager";
import ChampionManager from "./ChampionManager";
import PhysicsManager from "./PhysicsManager";

const TICKS = 60;

export default class GameManager {
  public static instance: GameManager;

  public static physicsManager: PhysicsManager;
  public static networkManager: NetworkManager;
  public static gameObjectManager: GameObjectManager;
  public static dataManager: DataManager;
  public static championManager: ChampionManager;

  private static updateInterval: NodeJS.Timeout | null = null;

  private static lastUpdate: number = Date.now();

  public static async init() {
    this.dataManager = new DataManager();

    await this.dataManager.loadData();

    this.physicsManager = new PhysicsManager();
    this.networkManager = new NetworkManager();
    this.gameObjectManager = new GameObjectManager();
    this.championManager = new ChampionManager(this.networkManager);

    this.start();
  }

  private static start() {
    if (this.updateInterval !== null) return;
    this.lastUpdate = Date.now();
    this.updateInterval = setInterval(
      () => this.update((Date.now() - this.lastUpdate) / 1000),
      1000 / TICKS
    );
  }

  private static update(delta: number) {
    this.gameObjectManager.getAll().forEach((go) => go.fixedUpdate(delta));
    this.physicsManager.update(delta);
    this.gameObjectManager.getAll().forEach((go) => go.update(delta));

    this.sendState();

    this.lastUpdate = Date.now();
  }

  private static sendState() {
    this.networkManager.send("STATE", {
      gameObjects: this.gameObjectManager.serialize(),
    });
  }

  public static logState() {
    console.log("--------------------------");
    console.log(this.gameObjectManager.getPlayers().length, "PLAYERS");
    console.log("--------------------------");
  }
}
