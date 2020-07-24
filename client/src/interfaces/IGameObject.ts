import { IVector2 } from "./IVector";

export default interface IGameObject {
  id: string;
  type: string;
  position: IVector2;
}
