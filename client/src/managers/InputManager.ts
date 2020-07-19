import { Application, InteractionManager, InteractionEvent } from "pixi.js";

import GameManager from "./GameManager";
import NetworkManager from "./NetworkManager";

export default class InputManager {
  private interaction: InteractionManager;

  private app: Application;

  constructor(app: Application) {
    this.app = app;

    this.interaction = new InteractionManager(app.renderer);

    this.interaction.on("rightdown", (event) => this.onRightClick(event));

    app.renderer.view.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }

  onRightClick(event: InteractionEvent) {
    const { x, y } = event.data.global;

    GameManager.instance.networkManager.send("MOVE", { x, y });

    GameManager.instance.effectManager.createMoveTarget(x, y);
  }
}
