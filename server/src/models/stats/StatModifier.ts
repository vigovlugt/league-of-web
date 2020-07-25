import Stat from "./Stat";

export default class StatModifier {
  public addition: number;
  public multiplier: number;

  private stat: Stat | null = null;

  private duration: number | null = null;
  private currentDuration: number | null = null;

  // private priority: number = 0;

  constructor(addition: number, multiplier: number, duration?: number) {
    this.addition = addition;
    this.multiplier = multiplier;

    if (duration) {
      this.duration = this.currentDuration = duration;
    }
  }

  setStat(stat: Stat) {
    this.stat = stat;
  }

  update(delta: number) {
    if (!this.currentDuration) return;
    this.currentDuration -= delta;

    if (this.currentDuration <= 0) {
      if (this.stat) {
        this.stat.removeModifier(this);
      }
    }
  }
}
