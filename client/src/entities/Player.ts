import GameObject from "./GameObject";
import { Graphics, Rectangle, Text } from "pixi.js";
import IPlayer from "../interfaces/IPlayer";
import Healthbar from "../ui/Healthbar";

export default class Player extends GameObject {
  private name: string;
  private champion: string;

  public isLocalPlayer: boolean;

  public health: number;
  public maxHealth: number;

  private healthBar: Healthbar;

  targetable = true;

  constructor(go: IPlayer, isLocalPlayer: boolean) {
    super(go);

    this.name = go.name;
    this.champion = go.champion;
    this.isLocalPlayer = isLocalPlayer;
    this.health = go.health;
    this.maxHealth = go.maxHealth;

    const graphics = new Graphics();
    let color = 0xffffff;

    if (this.isLocalPlayer) {
      color = 0x6666ff;
    }

    graphics.lineStyle(3, color, 1);
    graphics.beginFill(0, 0);
    graphics.drawRect(-25, -65, 50, 75);
    graphics.endFill();
    graphics.hitArea = new Rectangle(-25, -65, 50, 75);

    this.sprite = graphics;

    const name = new Text(this.name, {
      fontFamily: "VT323, Arial",
      fontSize: 16,
      fill: 0xffffff,
      align: "center",
    });
    name.y -= 105;
    name.x -= 25;

    graphics.addChild(name);
    this.healthBar = new Healthbar(this);
  }

  sync(player: IPlayer) {
    super.sync(player);

    if (this.health != player.health || this.maxHealth != player.maxHealth) {
      this.health = player.health;
      this.maxHealth = player.maxHealth;
      this.healthBar.sync();
    }
  }
}
