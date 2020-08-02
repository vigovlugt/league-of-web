import Ability, {
  AbilityTargetType,
} from "../../../../models/abilities/Ability";
import Target from "../../../../types/Target";
import Champion from "../../../Champion";
import { constrainRange } from "../../../../utils/vectors";
import IVector2 from "../../../../interfaces/IVector";
import LucentSingularity from "./LucentSignularity";

const RANGE = 1000;

enum LucentSingularityState {
  NONE,
  INAIR,
  ONGROUND,
}

export default class LucentSingularityAbility extends Ability {
  private state: LucentSingularityState = LucentSingularityState.NONE;

  private explodeWhenOnGround: boolean = false;
  private isEnded: boolean = false;
  private autoExplodeTimeout?: NodeJS.Timeout;

  public lucentSignularity?: LucentSingularity;

  constructor(champion: Champion) {
    super(champion, {
      cooldown: 3,
      castTime: 0.25,
      targetType: AbilityTargetType.POSITION,
      oneCast: false,
    });
  }

  canCast() {
    return !this.isEnded;
  }

  onCast(target: Target) {
    super.onCast(target);
    switch (this.state) {
      case LucentSingularityState.NONE:
        this.create(target as IVector2);
        break;
      case LucentSingularityState.INAIR:
        this.explodeWhenOnGround = true;
        break;
      case LucentSingularityState.ONGROUND:
        this.explode();
        break;
    }
  }

  create(target: IVector2) {
    this.lucentSignularity = new LucentSingularity(this.champion, target);

    this.lucentSignularity.spawn();
    this.state = LucentSingularityState.INAIR;

    this.lucentSignularity.on("ARRIVE", () => {
      if (this.explodeWhenOnGround) {
        this.explode();
      } else {
        this.autoExplodeTimeout = setTimeout(() => {
          this.explode();
        }, 5000);
      }
    });
  }

  explode() {
    if (this.lucentSignularity) {
      this.lucentSignularity.explode();
    }

    if (this.autoExplodeTimeout) {
      clearTimeout(this.autoExplodeTimeout);
    }
    this.isEnded = true;
    this.explodeWhenOnGround = false;
    this.state = LucentSingularityState.NONE;
  }

  onCooldownEnd() {
    this.isEnded = false;
  }
}
