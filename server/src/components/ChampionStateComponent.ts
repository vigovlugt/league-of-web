import Component from "./Component";
import Champion from "../entities/Champion";
import PlayerState from "../models/state/player/PlayerState";
import IdleState from "../models/state/player/IdleState";
import Command from "../commands/Command";
import MoveCommand from "../commands/MoveCommand";
import AttackCommand from "../commands/AttackCommand";
import AbilityCommand from "../commands/AbilityCommand";

export default class ChampionStateComponent extends Component {
  private champion: Champion;

  private state: PlayerState;

  constructor(champion: Champion) {
    super(champion);
    this.champion = champion;

    this.state = new IdleState(this.champion);
  }

  update(delta: number) {
    this.state = this.state.update(delta);
  }

  onCommand(command: Command) {
    switch (command.constructor) {
      case MoveCommand:
        this.state = this.state.onMove(command as MoveCommand);
        break;

      case AttackCommand:
        this.state = this.state.onAttack(command as AttackCommand);
        break;

      case AbilityCommand:
        this.state = this.state.onAbility(command as AbilityCommand);
        break;
    }
  }
}
