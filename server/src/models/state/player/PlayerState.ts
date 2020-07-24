import MoveCommand from "../../../commands/MoveCommand";
import AttackCommand from "../../../commands/AttackCommand";
import AbilityCommand from "../../../commands/AbilityCommand";
import Champion from "../../../entities/Champion";

export default class PlayerState {
  protected champion: Champion;

  constructor(player: Champion) {
    this.champion = player;
  }

  onMove(moveCommand: MoveCommand): PlayerState {
    return this;
  }

  onAttack(attackCommand: AttackCommand): PlayerState {
    return this;
  }

  onAbility(abilityCommand: AbilityCommand): PlayerState {
    return this;
  }

  update(delta: number): PlayerState {
    return this;
  }
}
