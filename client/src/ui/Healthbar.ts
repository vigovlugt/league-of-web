import { Graphics } from "pixi.js";
import Champion from "../entities/Champion";
import setPivotCenter from "../utils/sprite";

const WIDTH = 100;
const HEIGHT = 10;

export default class Healthbar {
  private bg: Graphics;
  private hp: Graphics;
  private shield: Graphics;

  private player: Champion;

  constructor(player: Champion) {
    this.player = player;

    this.bg = new Graphics();
    this.bg.beginFill(0xaaaaaa).drawRect(0, 0, WIDTH, HEIGHT).endFill();
    setPivotCenter(this.bg);

    this.hp = new Graphics();

    const color = player.isLocalPlayer ? 0x00ff00 : 0x4444ff;

    this.hp.beginFill(color).drawRect(0, 0, WIDTH, HEIGHT).endFill();

    this.bg.addChild(this.hp);
    (this.player.sprite as Graphics).addChild(this.bg);

    this.bg.y -= 80;

    this.shield = new Graphics()
      .beginFill(0xffffff)
      .drawRect(0, 0, WIDTH, HEIGHT)
      .endFill();

    this.bg.addChild(this.shield);

    this.sync();
  }

  sync() {
    const hpWithShield = this.player.maxHealth + this.player.shield;
    const hpScale = this.player.health / hpWithShield;

    this.hp.scale.set(hpScale, 1);

    const shieldScale = this.player.shield / hpWithShield;

    this.shield.scale.set(shieldScale, 1);
    this.shield.x = this.hp.width + this.hp.x;
  }
}
