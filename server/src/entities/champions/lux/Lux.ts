import Champion from "../../Champion";
import WebSocket from "ws";
import Ability, { AbilityTargetType } from "../../../models/abilities/Ability";
import LuxQAbility from "./abilities/LightBindingAbility";
import LightBindingAbility from "./abilities/LightBindingAbility";

export default class Lux extends Champion {
  constructor(socket: WebSocket, name: string) {
    super("Lux", socket, name, 65);
    this.abilityComponent.setAbilities([new LightBindingAbility(this)]);
  }
}
