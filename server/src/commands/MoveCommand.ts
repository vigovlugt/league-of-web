import Command from "./Command";
import IVector2 from "../interfaces/IVector";

export default class MoveCommand extends Command {
  public target: IVector2;
  constructor(target: IVector2) {
    super();
    this.target = target;
  }
}
