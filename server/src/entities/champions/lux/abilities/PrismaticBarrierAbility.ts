import Ability, {
  AbilityTargetType,
} from "../../../../models/abilities/Ability";
import Target from "../../../../types/Target";
import Champion from "../../../Champion";
import LightBinding from "./LightBinding";
import { getDirection } from "../../../../lib/vectors";
import IVector2 from "../../../../interfaces/IVector";
import PrismaticBarrier from "./PrismaticBarrier";

export default class PrismaticBarrierAbility extends Ability {
  constructor(champion: Champion) {
    super(champion, {
      cooldown: 3,
      castTime: 0.25,
      targetType: AbilityTargetType.POSITION,
    });
  }

  onCast(target: Target) {
    super.onCast(target);

    const projectile = new PrismaticBarrier(
      this.champion,
      getDirection(this.champion.position, target as IVector2)
    );
    projectile.spawn();
  }
}
