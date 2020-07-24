import Command from "./Command";
import Target from "../types/Target";

export default class AbilityCommand extends Command {
  public ability: string;
  public target: Target;
  constructor(ability: string, target: Target) {
    super();
    this.ability = ability;
    this.target = target;
  }
}
