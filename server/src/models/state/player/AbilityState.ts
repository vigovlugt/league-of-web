import MoveCommand from "../../../commands/MoveCommand";
import AttackCommand from "../../../commands/AttackCommand";
import AbilityCommand from "../../../commands/AbilityCommand";
import Champion from "../../../entities/Champion";
import PlayerState from "./PlayerState";
import MoveState from "./MoveState";
import Ability from "../../abilities/Ability";
import Target from "../../../types/Target";
import IdleState from "./IdleState";

export default class AbilityState extends PlayerState {
  private currentCastTime: number;

  private ability: Ability;

  private target: Target;

  constructor(champion: Champion, ability: Ability, target: Target) {
    super(champion);

    this.ability = ability;
    this.target = target;

    this.currentCastTime = ability.castTime;

    this.champion.moveComponent.setTarget(null);
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
    super.update(delta);

    if (this.currentCastTime <= 0) {
      this.cast();
      return new IdleState(this.champion);
    } else {
      this.currentCastTime -= delta;
    }

    return this;
  }

  cast() {
    this.ability.onCast(this.target);
  }
}
