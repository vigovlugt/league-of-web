import WebSocket, { Data } from "ws";
import GameObject from "./GameObject";
import NetworkManager from "../managers/NetworkManager";
import GameManager from "../managers/GameManager";
import IVector2 from "../interfaces/IVector";

const MOVEMENT_SPEED_MULTIPLIER = 0.01;

export default class Player extends GameObject {
  public champion: string;

  public stats: { [key: string]: number };

  public target: IVector2 | null = null;

  public socket: WebSocket;

  constructor(x: number, y: number, socket: WebSocket) {
    super("PLAYER", x, y);

    this.champion = "Lux";
    this.stats = GameManager.instance.dataManager.getChampionStats(
      this.champion
    );

    this.socket = socket;

    socket.on("close", () => this.onLeave());

    socket.on("message", (message) => this.onMessage(message));
  }

  onMessage(message: Data) {
    const { type, data } = NetworkManager.parseMessage(message);
    switch (type) {
      case "MOVE":
        this.onMoveCommand(data.x, data.y);
        break;
    }
  }

  onMoveCommand(x: number, y: number) {
    this.target = { x, y };
  }

  update(delta: number) {
    this.move(delta);
  }

  move(delta: number) {
    if (this.target != null) {
      const speed = this.stats.movespeed * MOVEMENT_SPEED_MULTIPLIER;

      const distanceX = this.target.x - this.x;
      const distanceY = this.target.y - this.y;
      if (Math.abs(distanceX) + Math.abs(distanceY) < 5) {
        this.target = null;
        return;
      }

      const direction = Math.atan2(distanceY, distanceX);
      this.x += speed * Math.cos(direction);
      this.y += speed * Math.sin(direction);
    }
  }

  onLeave() {
    super.destroy();
    console.log("LEAVE: ", this.id);
    GameManager.instance.logState();
  }
}
