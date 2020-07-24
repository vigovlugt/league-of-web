import Component from "./Component";
import WebSocket, { Data } from "ws";
import NetworkManager from "../managers/NetworkManager";
import Champion from "../entities/Champion";
import AbilityCommand from "../commands/AbilityCommand";
import AttackCommand from "../commands/AttackCommand";
import MoveCommand from "../commands/MoveCommand";

export default class NetworkComponent extends Component {
  private socket: WebSocket;

  private champion: Champion;

  constructor(go: Champion, socket: WebSocket) {
    super(go);
    this.champion = go;

    this.socket = socket;

    this.socket.on("close", () => this.onDisconnect());
    this.socket.on("message", (message) => this.onMessage(message));

    socket.send(
      NetworkManager.serializeMessage({
        type: "JOIN",
        data: { id: this.champion.id },
      })
    );
  }

  onMessage(message: Data) {
    const { type, data } = NetworkManager.parseMessage(message);

    let command;

    switch (type) {
      case "MOVE":
        command = new MoveCommand(data);
        break;
      case "ATTACK":
        command = new AttackCommand(data.targetId);
        break;
      case "ABILITY":
        command = new AbilityCommand(data.ability, data.target);
        break;
    }

    if (command != null) {
      this.champion.stateComponent.onCommand(command);
    }
  }

  onDisconnect() {
    console.log("PLAYER LEAVE: ", this.champion.name);
    this.champion.destroy();
  }
}
