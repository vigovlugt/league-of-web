import GameObject from "./GameObject";
import { Graphics, Text, Circle } from "pixi.js";
import IChampion from "../interfaces/IChampion";
import Healthbar from "../ui/Healthbar";
import setPivotCenter from "../utils/sprite";

export default class Champion extends GameObject {
  private name: string;
  private champion: string;

  public isLocalPlayer: boolean;

  public health: number;
  public maxHealth: number;

  public shield: number;

  private healthBar: Healthbar;

  targetable = true;

  constructor(go: IChampion, isLocalPlayer: boolean) {
    super(go);

    this.name = go.name;
    this.champion = go.champion;
    this.isLocalPlayer = isLocalPlayer;
    this.health = go.health;
    this.maxHealth = go.maxHealth;
    this.shield = go.shield;

    const graphics = new Graphics();
    let color = 0xffffff;

    if (this.isLocalPlayer) {
      color = 0x6666ff;
    }

    graphics.lineStyle(3, color, 1);
    graphics.beginFill(0, 0);
    graphics.drawCircle(0, 0, go.radius!);
    graphics.endFill();
    graphics.hitArea = new Circle(0, 0, go.radius);

    this.sprite = graphics;

    const name = new Text(this.name, {
      fontFamily: "VT323, Arial",
      fontSize: 26,
      fill: 0xffffff,
    });
    setPivotCenter(name);
    name.y -= 105;

    graphics.addChild(name);
    this.healthBar = new Healthbar(this);
  }

  sync(player: IChampion) {
    super.sync(player);

    if (
      this.health != player.health ||
      this.maxHealth != player.maxHealth ||
      this.shield != player.shield
    ) {
      this.health = player.health;
      this.maxHealth = player.maxHealth;
      this.shield = player.shield;
      this.healthBar.sync();
    }
  }
}
