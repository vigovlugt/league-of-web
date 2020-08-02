import AbilityCommand from "../../commands/AbilityCommand";
import Target from "../../types/Target";
import Champion from "../../entities/Champion";

export enum AbilityTargetType {
  POSITION,
  GAMEOBJECT,
  NONE,
}

export interface IAbility {
  cooldown: number;
  castTime: number;
  targetType: AbilityTargetType;
  oneCast?: boolean;
}

export default class Ability implements IAbility {
  public champion: Champion;

  public cooldown: number;
  public castTime: number;
  public targetType: AbilityTargetType;
  public oneCast: boolean;

  private currentCooldown: number = 0;

  constructor(
    champion: Champion,
    { cooldown, castTime, targetType, oneCast = true }: IAbility
  ) {
    this.champion = champion;

    this.cooldown = cooldown;
    this.castTime = castTime;
    this.targetType = targetType;
    this.oneCast = oneCast;
  }

  canCast() {
    return this.currentCooldown <= 0;
  }

  onCast(target: Target) {
    if (this.oneCast) {
      this.currentCooldown = this.cooldown;
    }
  }

  setCooldown() {
    this.currentCooldown = this.cooldown;
  }

  update(delta: number) {
    if (this.currentCooldown > 0) {
      this.currentCooldown -= delta;
      if (this.currentCooldown <= 0) {
        this.onCooldownEnd();
      }
    }
  }

  onCooldownEnd() {}
}
