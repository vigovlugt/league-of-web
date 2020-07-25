import MoveCommand from "../../../commands/MoveCommand";
import AttackCommand from "../../../commands/AttackCommand";
import AbilityCommand from "../../../commands/AbilityCommand";
import Champion from "../../../entities/Champion";
import IVector2 from "../../../interfaces/IVector";
import PlayerState from "./PlayerState";
import GameManager from "../../../managers/GameManager";
import IdleState from "./IdleState";
import MoveState from "./MoveState";
import GameObject from "../../../entities/GameObject";
import AttackComponent from "../../../components/AttackComponent";
import AbilityState from "./AbilityState";

enum AttackStateType {
  WINDUP,
  WINDDOWN,
}

const WINDUP_MULITPLIER = 0.15;
const WINDDOWN_MULTIPLIER = 0.3;

export default class AttackState extends PlayerState {
  private target: string;

  private windUpTime: number = 0;
  private windDownTime: number = 0;

  private attackState: AttackStateType = AttackStateType.WINDUP;

  constructor(champion: Champion, target: string) {
    super(champion);
    this.target = target;

    this.windUpTime = this.champion.stats!.getAttackTime() * WINDUP_MULITPLIER;
    this.windDownTime =
      this.champion.stats!.getAttackTime() * WINDDOWN_MULTIPLIER;
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

  update(delta: number): PlayerState {
    super.update(delta);

    const go = GameManager.gameObjectManager.get(this.target);
    if (go == null) {
      return new IdleState(this.champion);
    }

    switch (this.attackState) {
      case AttackStateType.WINDUP:
        return this.updateWindUp(delta, go);
      case AttackStateType.WINDDOWN:
        return this.updateWindDown(delta);
    }
  }

  updateWindUp(delta: number, go: GameObject): PlayerState {
    this.windUpTime -= delta;

    if (this.windUpTime <= 0) {
      this.champion.attackComponent.attack(go);

      this.champion.attackComponent.attackCooldown =
        this.champion.stats!.getAttackTime() * (1 - WINDUP_MULITPLIER);

      this.attackState = AttackStateType.WINDDOWN;
    }

    return this;
  }

  updateWindDown(delta: number): PlayerState {
    this.windDownTime -= delta;

    if (this.windDownTime <= 0) {
      return new MoveState(this.champion, this.target);
    }

    return this;
  }
}
