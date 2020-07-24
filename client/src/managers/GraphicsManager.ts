import GameManager from "./GameManager";
import { Graphics } from "pixi.js";

export default class GraphicsManager {
  public static getGraphicsByType(type: string, id: string) {
    switch (type) {
      case "PLAYER":
        return this.getPlayerGraphics(id);
      case "AUTOATTACK":
        return this.getAutoAttackGraphics();
    }
  }

  public static getAutoAttackGraphics() {}
}
