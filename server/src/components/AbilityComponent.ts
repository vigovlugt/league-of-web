import Component from "./Component";
import Ability from "../models/abilities/Ability";
import Champion from "../entities/Champion";
import AbilityCommand from "../commands/AbilityCommand";

export default class AbilityComponent extends Component {
  private abilities: Ability[];

  private champion: Champion;

  constructor(go: Champion, abilities: Ability[]) {
    super(go);
    this.champion = go;
    this.abilities = abilities;
  }

  setAbilities(abilities: Ability[]) {
    this.abilities = abilities;
  }

  getAbilityByCommand(command: AbilityCommand) {
    const index = ["q", "w", "e", "r"].indexOf(command.ability);
    const ability = this.abilities[index];

    return ability;
  }

  update(delta: number) {
    this.abilities.forEach((ability) => ability.update(delta));
  }
}
