import MoveCommand from "../../../commands/MoveCommand";
import AttackCommand from "../../../commands/AttackCommand";
import AbilityCommand from "../../../commands/AbilityCommand";
import Player from "../../../entities/Player";
import PlayerState from "./PlayerState";
import IVector2 from "../../../interfaces/IVector";
import GameManager from "../../../managers/GameManager";
import IdleState from "./IdleState";
import AttackState from "./AttackState";
import { getDistance } from "../../../utils/vectors";
import MoveComponent from "../../../components/MoveComponent";

const IDLE_DISTANCE = 3;

export default class MoveState extends PlayerState {
  private target: IVector2 | string;

  constructor(player: Player, target: IVector2 | string) {
    super(player);
    this.target = target;
  }

  onMove(moveCommand: MoveCommand): PlayerState {
    this.target = moveCommand.target;
    return this;
  }

  onAttack(attackCommand: AttackCommand): PlayerState {
    return new MoveState(this.player, attackCommand.targetId);
  }

  onAbility(abilityCommand: AbilityCommand): PlayerState {
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
      return new IdleState(this.player);
    }

    const targetIsEnemy = typeof this.target === "string";

    const attackRange = this.player.stats!.getAttackRange();

    const totalDistance = getDistance(targetPos, this.player.position);

    const moveComponent = this.player.getComponent(MoveComponent)!;

    moveComponent.setTarget(targetPos);

    if (targetIsEnemy && totalDistance <= attackRange) {
      //If in attackrange of enemy
      moveComponent.setTarget(null);

      if (this.player.attackCooldown <= 0) {
        return new AttackState(this.player, this.target as string);
      }
    } else if (!targetIsEnemy && moveComponent.checkAtTarget() == true) {
      //If at target position
      return new IdleState(this.player);
    }

    return this;
  }
}
