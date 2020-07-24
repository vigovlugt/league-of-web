import AbilityCommand from "../../commands/AbilityCommand";
import Target from "../../types/Target";
import Champion from "../../entities/Champion";

export enum AbilityTargetType {
  POSITION,
  GAMEOBJECT,
  NONE,
}

export default class Ability {
  private cooldown: number;
  private currentCooldown: number = 0;

  public castTime: number;

  public targetType: AbilityTargetType;

  public champion: Champion;

  constructor(
    champion: Champion,
    cooldown: number,
    castTime: number,
    targetType: AbilityTargetType
  ) {
    this.champion = champion;
    this.cooldown = cooldown;
    this.castTime = castTime;
    this.targetType = targetType;
  }

  canCast() {
    return this.currentCooldown <= 0;
  }

  onCast(target: Target) {
    this.currentCooldown = this.cooldown;
  }

  update(delta: number) {
    if (this.currentCooldown > 0) {
      this.currentCooldown -= delta;
    }
  }
}
