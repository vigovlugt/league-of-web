import Ability, {
  AbilityTargetType,
} from "../../../../models/abilities/Ability";
import Target from "../../../../types/Target";
import Champion from "../../../Champion";
import { constrainRange } from "../../../../lib/vectors";
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

  constructor(champion: Champion) {
    super(champion, {
      cooldown: 3,
      castTime: 0.25,
      targetType: AbilityTargetType.POSITION,
    });
  }

  onCast(target: Target) {
    switch (this.state) {
      case LucentSingularityState.NONE:
        const lucentSignularity = new LucentSingularity(
          this.champion,
          target as IVector2
        );

        lucentSignularity.spawn();
        this.state = LucentSingularityState.INAIR;

        break;
      case LucentSingularityState.INAIR:
        break;
      case LucentSingularityState.ONGROUND:
        break;
    }
  }
}
