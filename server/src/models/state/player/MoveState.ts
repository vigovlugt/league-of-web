import MoveCommand from "../../../commands/MoveCommand";
import AttackCommand from "../../../commands/AttackCommand";
import AbilityCommand from "../../../commands/AbilityCommand";
import Champion from "../../../entities/Champion";
import PlayerState from "./PlayerState";
import IVector2 from "../../../interfaces/IVector";
import GameManager from "../../../managers/GameManager";
import IdleState from "./IdleState";
import AttackState from "./AttackState";
import { getDistance } from "../../../lib/vectors";
import MoveComponent from "../../../components/MoveComponent";
import AbilityState from "./AbilityState";

export default class MoveState extends PlayerState {
  private target: IVector2 | string;

  constructor(champion: Champion, target: IVector2 | string) {
    super(champion);
    this.target = target;
  }

  onMove(moveCommand: MoveCommand): PlayerState {
    return new MoveState(this.champion, moveCommand.target);
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

  private getTargetPos() {
    const targetIsEnemy = typeof this.target === "string";

    if (targetIsEnemy) {
      const go = GameManager.gameObjectManager.get(this.target as string);
      if (!go) {
        return null;
      }

      return go.position;
    }

    return this.target as IVector2;
  }

  update(delta: number): PlayerState {
    super.update(delta);

    const targetPos = this.getTargetPos();
    if (targetPos == null) {
      return new IdleState(this.champion);
    }

    const targetIsEnemy = typeof this.target === "string";

    const attackRange = this.champion.stats!.attackRange.get();

    const totalDistance = getDistance(targetPos, this.champion.position);

    const moveComponent = this.champion.getComponent(MoveComponent)!;

    moveComponent.setTarget(targetPos);

    if (targetIsEnemy && totalDistance <= attackRange) {
      //If in attackrange of enemy
      moveComponent.setTarget(null);

      if (this.champion.attackComponent.canAttack()) {
        return new AttackState(this.champion, this.target as string);
      }
    } else if (!targetIsEnemy && moveComponent.checkAtTarget() == true) {
      //If at target position
      return new IdleState(this.champion);
    }

    return this;
  }
}
