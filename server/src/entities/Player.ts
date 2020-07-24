import WebSocket, { Data } from "ws";
import GameObject from "./GameObject";
import NetworkManager from "../managers/NetworkManager";
import GameManager from "../managers/GameManager";
import IVector2 from "../interfaces/IVector";
import MoveCommand from "../commands/MoveCommand";
import PlayerState from "../models/state/player/PlayerState";
import AttackCommand from "../commands/AttackCommand";
import AbilityCommand from "../commands/AbilityCommand";
import IdleState from "../models/state/player/IdleState";
import PlayerStats from "../models/stats/PlayerStats";
import HealthComponent from "../components/HealthComponent";
import AttackComponent from "../components/AttackComponent";
import MoveComponent from "../components/MoveComponent";
import RangedAttackComponent from "../components/RangedAttackComponent";
import IJoinData from "../interfaces/IJoinData";
import AbilityComponent from "../components/AbilityComponent";

export default class Player extends GameObject {
  public name: string = "";
  public champion: string | null = null;

  public stats: PlayerStats | null = null;
  public state: PlayerState = new IdleState(this);

  public target: IVector2 | null = null;
  public attackCooldown: number = 0;

  public socket: WebSocket;

  constructor(socket: WebSocket) {
    super("PLAYER", { x: 0, y: 0 });

    this.socket = socket;

    socket.on("close", () => this.onLeave());

    socket.on("message", (message) => this.onMessage(message));
  }

  onMessage(message: Data) {
    const { type, data } = NetworkManager.parseMessage(message);

    if (type !== "JOIN" && !this.spawned) return;

    switch (type) {
      case "JOIN":
        this.onJoin(data);
        break;
      case "MOVE":
        const moveCommand = new MoveCommand(data);
        this.state = this.state.onMove(moveCommand);
        break;
      case "ATTACK":
        const attackCommand = new AttackCommand(data.targetId);
        this.state = this.state.onAttack(attackCommand);
        break;
      case "ABILITY":
        const abilityCommand = new AbilityCommand(data.ability);
        this.state = this.state.onAbility(abilityCommand);
        break;
    }
  }

  update(delta: number) {
    this.state = this.state.update(delta);
    super.update(delta);
  }

  onJoin(data: IJoinData) {
    this.name = data.name;
    this.stats = new PlayerStats(data.champion);

    this.addComponent(new MoveComponent(this, this.stats.getMovementSpeed()));
    this.addComponent(new HealthComponent(this, this.stats.base.health));
    if (this.stats.base.attackRange > 200) {
      this.addComponent(
        new RangedAttackComponent(this, this.stats.getAttackDamage())
      );
    } else {
      this.addComponent(
        new AttackComponent(this, this.stats.getAttackDamage())
      );
    }

    this.addComponent(new AbilityComponent(this));

    this.position.x = Math.random() * 1000;
    this.position.y = Math.random() * 1000;
    super.spawn();

    console.log("JOIN: ", this.id);

    GameManager.networkManager.sendToSocket(this.socket, "JOIN", {
      id: this.id,
    });
  }

  serialize() {
    const base = super.serialize();

    const { name, champion } = this;

    const serialized = { ...base, name, champion };

    return serialized;
  }

  onLeave() {
    super.destroy();
    console.log("LEAVE: ", this.id);
    GameManager.logState();
  }
}
