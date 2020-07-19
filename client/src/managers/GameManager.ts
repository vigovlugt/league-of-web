import NetworkManager from "./NetworkManager";
import { Application } from "pixi.js";
import InputManager from "./InputManager";
import EffectManager from "./EffectManager";

export default class GameManager {
  public static instance: GameManager;

  public app: Application;

  public networkManager: NetworkManager;
  public inputManager: InputManager;
  public effectManager: EffectManager;

  constructor() {
    GameManager.instance = this;
    (window as any).gameManager = this;
    this.networkManager = new NetworkManager();
  }

  public onAppMounted(app: Application) {
    this.app = app;
    this.inputManager = new InputManager(app);
    this.effectManager = new EffectManager(app);
  }
}
