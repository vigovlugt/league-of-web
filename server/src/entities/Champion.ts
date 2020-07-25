import WebSocket from "ws";
import GameObject from "./GameObject";
import ChampionStats from "../models/stats/ChampionStats";
import HealthComponent from "../components/HealthComponent";
import AttackComponent from "../components/AttackComponent";
import MoveComponent from "../components/MoveComponent";
import RangedAttackComponent from "../components/RangedAttackComponent";
import AbilityComponent from "../components/AbilityComponent";
import NetworkComponent from "../components/NetworkComponent";
import ChampionStateComponent from "../components/ChampionStateComponent";
import CollisionComponent from "../components/CollisionComponent";
import ShieldComponent from "../components/ShieldComponent";

export default class Champion extends GameObject {
  public name: string = "";
  public champion: string | null = null;
  public stats: ChampionStats;

  moveComponent: MoveComponent;
  collisionComponent: CollisionComponent;
  healthComponent: HealthComponent;
  shieldComponent: ShieldComponent;
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
    this.stats = new ChampionStats(champion);

    this.moveComponent = this.addComponent(
      new MoveComponent(this, this.stats.movementSpeed)
    );
    this.healthComponent = this.addComponent(
      new HealthComponent(this, this.stats.base.health)
    );
    this.shieldComponent = this.addComponent(new ShieldComponent(this));

    if (this.stats.base.attackRange > 200) {
      this.attackComponent = this.addComponent(
        new RangedAttackComponent(this, this.stats.attackDamage)
      );
    } else {
      this.attackComponent = this.addComponent(
        new AttackComponent(this, this.stats.attackDamage)
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

  update(delta: number) {
    super.update(delta);

    this.stats.update(delta);
  }

  serialize() {
    const base = super.serialize();

    const { name, champion } = this;

    const serialized = { ...base, name, champion };

    return serialized;
  }
}
