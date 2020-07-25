import GameManager from "./GameManager";

interface IEventListener {
  eventType: string;
  execute: Function;
}

export default class NetworkManager {
  private socket: WebSocket;

  public joined: boolean = false;

  public playerId: string | undefined;

  private eventListeners: IEventListener[] = [];

  constructor() {
    this.socket = new WebSocket("ws://" + window.location.hostname + ":3001");
    this.socket.addEventListener("open", () => {
      this.send("JOIN", {
        name: window.localStorage.getItem("name"),
        champion: window.localStorage.getItem("champion") || "Lux",
      });
    });

    this.on("JOIN", (data: { id: string }) => {
      this.playerId = data.id;
      this.joined = true;
      console.log("JOINED", data.id);
    });

    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      this.messageHandler(message.type, message.data);
    });
  }

  private messageHandler(type: string, data: any) {
    if (!this.joined && type != "JOIN") return;

    const filteredEventListeners = this.eventListeners.filter(
      (e) => e.eventType === type
    );
    filteredEventListeners.forEach((e) => e.execute(data));
  }

  public on(type: string, fn: Function) {
    this.eventListeners.push({ eventType: type, execute: fn });
  }

  public send(type: string, data: any) {
    const message = { type, data };
    this.socket.send(JSON.stringify(message));
  }

  public stop() {
    this.socket.close();
  }
}
