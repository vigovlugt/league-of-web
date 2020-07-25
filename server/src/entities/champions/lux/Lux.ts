import Champion from "../../Champion";
import WebSocket from "ws";
import LightBindingAbility from "./abilities/LightBindingAbility";
import PrismaticBarrierAbility from "./abilities/PrismaticBarrierAbility";
import LucentSingularityAbility from "./abilities/LucentSingularityAbility";

export default class Lux extends Champion {
  constructor(socket: WebSocket, name: string) {
    super("Lux", socket, name, 65);
    this.abilityComponent.setAbilities([
      new LightBindingAbility(this),
      new PrismaticBarrierAbility(this),
      new LucentSingularityAbility(this),
    ]);
  }
}
