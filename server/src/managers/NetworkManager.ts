import WebSocket, { Server, Data } from "ws";

import IEventListener from "../interfaces/IEventListener";
import { IncomingMessage } from "http";
import IMessage from "../interfaces/IMessage";

export default class NetworkManager {
  private server: Server;

  private eventListeners: IEventListener[] = [];

  constructor() {
    this.server = new Server({ port: 3001 }, () =>
      console.log("Listening on :3001")
    );

    this.server.on("connection", (socket, req) =>
      this.onConnection(socket, req)
    );
  }

  private onConnection(socket: WebSocket, req: IncomingMessage) {
    this.messageHandler("connection", socket);
  }

  public static parseMessage(message: Data) {
    const parsedMessage = JSON.parse(message as string);
    return parsedMessage;
  }

  public static serializeMessage(message: IMessage) {
    const serialized = JSON.stringify(message);
    return serialized;
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
    this.server.clients.forEach((socket) => {
      if (socket.readyState !== WebSocket.OPEN) return;
      this.sendToSocket(socket, type, data);
    });
  }

  public sendToSocket(socket: WebSocket, type: string, data: any) {
    const message = { type, data };
    socket.send(JSON.stringify(message));
  }
}
