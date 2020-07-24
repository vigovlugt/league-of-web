import GameObjectManager from "../managers/GameObjectManager";
import GameObject from "../entities/GameObject";
import Component from "./Component";
import Ability from "../models/abilities/Ability";
import Player from "../entities/Player";

export default class AbilityComponent extends Component {
  private abilities: Ability[];

  private player: Player;

  constructor(go: Player) {
    super(go);
    this.player = go;
  }
}
