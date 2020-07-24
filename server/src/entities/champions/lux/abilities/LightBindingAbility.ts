import Ability, {
  AbilityTargetType,
} from "../../../../models/abilities/Ability";
import Target from "../../../../types/Target";
import Champion from "../../../Champion";
import LightBinding from "./LightBinding";
import { getDirection } from "../../../../lib/vectors";
import IVector2 from "../../../../interfaces/IVector";

export default class LightBindingAbility extends Ability {
  constructor(champion: Champion) {
    super(champion, 3, 0.25, AbilityTargetType.POSITION);
  }

  onCast(target: Target) {
    super.onCast(target);

    const projectile = new LightBinding(
      this.champion,
      getDirection(this.champion.position, target as IVector2)
    );
    projectile.spawn();
  }
}
