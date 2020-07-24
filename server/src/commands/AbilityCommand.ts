import Command from "./Command";

export default class AbilityCommand extends Command {
  public ability: string;
  constructor(ability: string) {
    super();
    this.ability = ability;
  }
}
