import NetworkManager from "./NetworkManager";
import { Application } from "pixi.js";
import InputManager from "./InputManager";
import EffectManager from "./EffectManager";
import GameObjectManager from "./GameObjectManager";
import LoadManager from "./LoadManager";

export default class GameManager {
  public static initialized: boolean = false;

  public static app: Application;

  public static loadManager: LoadManager;
  public static gameObjectManager: GameObjectManager;
  public static networkManager: NetworkManager;
  public static inputManager: InputManager;
  public static effectManager: EffectManager;

  public static async init(element: HTMLElement) {
    this.initialized = true;

    this.loadManager = new LoadManager();

    await this.loadManager.load();

    this.app = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // this.app.stage.scale.set(0.5);

    element.appendChild(this.app.view);

    window.addEventListener("resize", () =>
      this.app.renderer.resize(window.innerWidth, window.innerHeight)
    );

    this.networkManager = new NetworkManager();
    this.gameObjectManager = new GameObjectManager(
      this.app,
      this.networkManager
    );
    this.effectManager = new EffectManager(this.app);
    this.inputManager = new InputManager(
      this.app,
      this.networkManager,
      this.effectManager,
      this.gameObjectManager
    );
  }

  public static stop() {
    this.networkManager.stop();
  }
}
