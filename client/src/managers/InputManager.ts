import { Application, InteractionManager, InteractionEvent } from "pixi.js";

import GameManager from "./GameManager";
import NetworkManager from "./NetworkManager";
import EffectManager from "./EffectManager";
import GameObjectManager from "./GameObjectManager";

export default class InputManager {
  private interaction: InteractionManager;

  private app: Application;

  private networkManager: NetworkManager;
  private effectManager: EffectManager;
  private gameObjectManager: GameObjectManager;

  constructor(
    app: Application,
    networkManager: NetworkManager,
    effectManager: EffectManager,
    gameObjectManager: GameObjectManager
  ) {
    this.app = app;

    this.networkManager = networkManager;
    this.effectManager = effectManager;
    this.gameObjectManager = gameObjectManager;

    this.interaction = new InteractionManager(app.renderer);

    this.interaction.on("rightdown", (event: InteractionEvent) =>
      this.onRightClick(event)
    );

    app.renderer.view.addEventListener("contextmenu", (e) =>
      e.preventDefault()
    );

    window.addEventListener("keydown", (event: KeyboardEvent) =>
      this.onKeyDown(event)
    );
  }

  onRightClick(event: InteractionEvent) {
    if (event.target != null) {
      const go = this.gameObjectManager.getBySprite(event.target);
      if (
        go != null &&
        go.targetable &&
        go.id != this.networkManager.playerId
      ) {
        this.networkManager.send("ATTACK", { targetId: go.id });
        return;
      }
    }
    const { x, y } = this.interaction.mouse.getLocalPosition(this.app.stage);

    this.networkManager.send("MOVE", { x, y });

    this.effectManager.createMoveTarget(x, y);
  }

  onKeyDown(event: KeyboardEvent) {
    if (["q", "w", "e", "r"].includes(event.key)) {
      const mousePos = this.interaction.mouse.getLocalPosition(this.app.stage);
      this.networkManager.send("ABILITY", {
        ability: event.key,
        target: { x: mousePos.x, y: mousePos.y },
      });
    }
  }
}
