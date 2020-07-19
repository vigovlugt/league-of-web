import WebSocket, { Data } from "ws";
import GameObject from "./GameObject";
import NetworkManager from "../managers/NetworkManager";
import GameManager from "../managers/GameManager";
import { lerp } from "../utils/movement";

export default class Player extends GameObject {
  public champion: string;

  public targetX: number | null = null;
  public targetY: number | null = null;

  public socket: WebSocket;

  constructor(x: number, y: number, socket: WebSocket) {
    super("PLAYER", x, y);

    this.champion = "RED";
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
    this.targetX = x;
    this.targetY = y;
  }

  update(delta: number) {
    if (this.targetX != null && this.targetY != null) {
      this.x = lerp(this.x, this.targetX, delta);
      this.y = lerp(this.y, this.targetY, delta);
    }
  }

  onLeave() {
    super.destroy();
    console.log("LEAVE: ", this.id);
    GameManager.instance.logState();
  }
}
