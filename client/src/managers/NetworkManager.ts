interface IEventListener {
  eventType: string;
  execute: Function;
}

export default class NetworkManager {
  private socket: WebSocket;

  private eventListeners: IEventListener[] = [];

  constructor() {
    this.socket = new WebSocket("ws://" + window.location.hostname + ":3001");

    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      this.messageHandler(message.type, message.data);
    });
  }

  private messageHandler(type: string, data: any) {
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
}
