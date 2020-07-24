import { Graphics } from "pixi.js";
import Player from "../entities/Player";
import setPivotCenter from "../utils/sprite";

export default class Healthbar {
  private bg: Graphics;
  private hp: Graphics;

  private player: Player;

  constructor(player: Player) {
    this.player = player;

    this.bg = new Graphics();
    this.bg.beginFill(0xaaaaaa).drawRect(0, 0, 70, 10).endFill();
    setPivotCenter(this.bg);

    this.hp = new Graphics();

    const color = player.isLocalPlayer ? 0x00ff00 : 0x4444ff;

    this.hp.beginFill(color).drawRect(0, 0, 70, 10).endFill();

    this.bg.addChild(this.hp);
    (this.player.sprite as Graphics).addChild(this.bg);

    this.bg.y -= 80;

    this.sync();
  }

  sync() {
    const scale = this.player.health / this.player.maxHealth;

    this.hp.scale.set(scale, 1);
  }
}
