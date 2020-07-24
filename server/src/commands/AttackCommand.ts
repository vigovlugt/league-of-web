import Command from "./Command";

export default class AttackCommand extends Command {
  public targetId: string;
  constructor(targetId: string) {
    super();
    this.targetId = targetId;
  }
}
