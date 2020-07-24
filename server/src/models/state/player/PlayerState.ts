import MoveCommand from "../../../commands/MoveCommand";
import AttackCommand from "../../../commands/AttackCommand";
import AbilityCommand from "../../../commands/AbilityCommand";
import Player from "../../../entities/Player";

export default class PlayerState {
  protected player: Player;

  constructor(player: Player) {
    this.player = player;
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
    if (this.player.attackCooldown > 0) {
      this.player.attackCooldown -= delta;
    }

    return this;
  }
}
