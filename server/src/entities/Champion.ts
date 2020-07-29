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
import ShieldComponent from "../components/ShieldComponent";
import BodyComponent from "../components/BodyComponent";
import { Bodies } from "matter-js";

export default class Champion extends GameObject {
  public name: string = "";
  public champion: string | null = null;
  public stats: ChampionStats;

  public moveComponent: MoveComponent;
  public bodyComponent: BodyComponent;
  public healthComponent: HealthComponent;
  public shieldComponent: ShieldComponent;
  public attackComponent: AttackComponent;
  public abilityComponent: AbilityComponent;
  public networkComponent: NetworkComponent;
  public stateComponent: ChampionStateComponent;

  constructor(
    champion: string,
    socket: WebSocket,
    name: string,
    radius: number
  ) {
    super("CHAMPION", { x: 0, y: 0 });

    this.name = name;
    this.stats = new ChampionStats(champion);

    this.bodyComponent = this.addComponent(
      new BodyComponent(this, Bodies.circle(0, 0, radius))
    );

    this.moveComponent = this.addComponent(
      new MoveComponent(this, this.bodyComponent, this.stats.movementSpeed)
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
