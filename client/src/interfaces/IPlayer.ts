import IGameObject from "./IGameObject";

export default interface IPlayer extends IGameObject {
  name: string;
  champion: string;
  health: number;
  maxHealth: number;
}
