import WebSocket from "ws";
import GameObject from "./GameObject";
import IVector2 from "../interfaces/IVector";
import PlayerStats from "../models/stats/PlayerStats";
import HealthComponent from "../components/HealthComponent";
import AttackComponent from "../components/AttackComponent";
import MoveComponent from "../components/MoveComponent";
import RangedAttackComponent from "../components/RangedAttackComponent";
import AbilityComponent from "../components/AbilityComponent";
import NetworkComponent from "../components/NetworkComponent";
import ChampionStateComponent from "../components/ChampionStateComponent";
import CollisionComponent from "../components/CollisionComponent";

export default class Champion extends GameObject {
  public name: string = "";
  public champion: string | null = null;
  public stats: PlayerStats | null = null;

  moveComponent: MoveComponent;
  collisionComponent: CollisionComponent;
  healthComponent: HealthComponent;
  attackComponent: AttackComponent;
  abilityComponent: AbilityComponent;
  networkComponent: NetworkComponent;
  stateComponent: ChampionStateComponent;

  constructor(
    champion: string,
    socket: WebSocket,
    name: string,
    radius: number
  ) {
    super("CHAMPION", { x: 0, y: 0 });

    this.name = name;
    this.stats = new PlayerStats(champion);

    this.moveComponent = this.addComponent(
      new MoveComponent(this, this.stats.getMovementSpeed())
    );
    this.healthComponent = this.addComponent(
      new HealthComponent(this, this.stats.base.health)
    );

    if (this.stats.base.attackRange > 200) {
      this.attackComponent = this.addComponent(
        new RangedAttackComponent(this, this.stats.getAttackDamage())
      );
    } else {
      this.attackComponent = this.addComponent(
        new AttackComponent(this, this.stats.getAttackDamage())
      );
    }

    this.collisionComponent = this.addComponent(
      new CollisionComponent(this, radius)
    );

    this.abilityComponent = this.addComponent(new AbilityComponent(this, []));

    this.stateComponent = this.addComponent(new ChampionStateComponent(this));

    this.networkComponent = this.addComponent(
      new NetworkComponent(this, socket)
    );

    this.position.x = Math.random() * 1000;
    this.position.y = Math.random() * 700;
  }

  serialize() {
    const base = super.serialize();

    const { name, champion } = this;

    const serialized = { ...base, name, champion };

    return serialized;
  }
}
