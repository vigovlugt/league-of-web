import NetworkManager from "./NetworkManager";
import WebSocket, { Data } from "ws";
import IJoinData from "../interfaces/IJoinData";
import Champion from "../entities/Champion";
import Lux from "../entities/champions/lux/Lux";

type ChampionClass = new (socket: WebSocket, name: string) => Champion;

const champions: {
  [key: string]: ChampionClass;
} = {
  Lux,
};

export default class ChampionManager {
  private networkManager: NetworkManager;
  constructor(networkManager: NetworkManager) {
    this.networkManager = networkManager;

    this.networkManager.on("connection", (socket: WebSocket) =>
      this.onConnect(socket)
    );
  }

  private onConnect(socket: WebSocket) {
    socket.on("message", (message: Data) => {
      const { type, data } = NetworkManager.parseMessage(message);
      if (type === "JOIN") {
        this.onJoin(socket, data);
      }
    });
  }

  private onJoin(socket: WebSocket, data: IJoinData) {
    console.log("PLAYER JOIN: ", data.name, "CHAMPION: ", data.champion);
    const ChampionCtor = champions[data.champion] || Lux;

    const champion = new ChampionCtor(socket, data.name);

    champion.spawn();
  }
}
