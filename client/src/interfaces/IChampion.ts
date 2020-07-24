import IGameObject from "./IGameObject";

export default interface IChampion extends IGameObject {
  name: string;
  champion: string;
  health: number;
  maxHealth: number;
}
