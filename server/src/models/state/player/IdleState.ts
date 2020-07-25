import MoveCommand from "../../../commands/MoveCommand";
import AttackCommand from "../../../commands/AttackCommand";
import AbilityCommand from "../../../commands/AbilityCommand";
import Champion from "../../../entities/Champion";
import PlayerState from "./PlayerState";
import MoveState from "./MoveState";
import AbilityState from "./AbilityState";

export default class IdleState extends PlayerState {
  constructor(champion: Champion) {
    super(champion);
  }

  onMove(moveCommand: MoveCommand): PlayerState {
    return new MoveState(this.champion, moveCommand.target);
    return this;
  }

  onAttack(attackCommand: AttackCommand): PlayerState {
    return new MoveState(this.champion, attackCommand.targetId);
  }

  onAbility(abilityCommand: AbilityCommand): PlayerState {
    const ability = this.champion.abilityComponent.getAbilityByCommand(
      abilityCommand
    );

    if (ability && ability.canCast()) {
      return new AbilityState(this.champion, ability, abilityCommand.target);
    }

    return this;
  }

  update(delta: number): PlayerState {
    super.update(delta);

    return this;
  }
}
