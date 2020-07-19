import { Application, settings, Graphics } from "pixi.js";

export default class EffectManager {
  private app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  createMoveTarget(x: number, y: number, seconds = 0.5) {
    const graphics = new Graphics();
    graphics.lineStyle(3, 0x33ff33, 1);
    graphics.beginFill(0, 0);
    graphics.drawEllipse(0, 0, 20, 10);
    graphics.endFill();

    graphics.x = x;
    graphics.y = y;

    this.app.stage.addChild(graphics);

    const animate = (delta) => {
      const ms = delta / settings.TARGET_FPMS;
      graphics.scale.set(graphics.scale.x - ms / (seconds * 1000));
    };

    this.app.ticker.add(animate);

    setTimeout(() => {
      this.app.ticker.remove(animate);
      graphics.destroy();
    }, seconds * 1000);
  }
}
