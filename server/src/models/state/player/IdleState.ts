import MoveCommand from "../../../commands/MoveCommand";
import AttackCommand from "../../../commands/AttackCommand";
import AbilityCommand from "../../../commands/AbilityCommand";
import Player from "../../../entities/Player";
import PlayerState from "./PlayerState";
import MoveState from "./MoveState";

export default class IdleState extends PlayerState {
  constructor(player: Player) {
    super(player);
  }

  onMove(moveCommand: MoveCommand): PlayerState {
    return new MoveState(this.player, moveCommand.target);
    return this;
  }

  onAttack(attackCommand: AttackCommand): PlayerState {
    return new MoveState(this.player, attackCommand.targetId);
  }

  onAbility(abilityCommand: AbilityCommand): PlayerState {
    return this;
  }

  update(delta: number): PlayerState {
    super.update(delta);

    return this;
  }
}
