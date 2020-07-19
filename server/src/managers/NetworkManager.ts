import WebSocket, { Server, Data } from "ws";

import IEventListener from "../interfaces/IEventListener";

export default class NetworkManager {
  private server: Server;

  private eventListeners: IEventListener[] = [];

  constructor() {
    this.server = new Server({ port: 3001 }, () =>
      console.log("Listening on :3001")
    );

    this.server.on("connection", (socket, req) => this.onConnection(socket));
  }

  private onConnection(socket: WebSocket) {
    this.messageHandler("connection", socket);

    socket.on("message", (message: Data) => {
      const parsedMessage = NetworkManager.parseMessage(message);
      this.messageHandler(parsedMessage.type, parsedMessage.data);
    });
  }

  public static parseMessage(message: Data) {
    const parsedMessage = JSON.parse(message as string);
    return parsedMessage;
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
    this.server.clients.forEach((socket) => {
      if (socket.readyState !== WebSocket.OPEN) return;
      socket.send(JSON.stringify(message));
    });
  }
}
