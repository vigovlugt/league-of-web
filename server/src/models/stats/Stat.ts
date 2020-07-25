import StatModifier from "./StatModifier";

export default class Stat {
  private base: number;

  private modifiers: StatModifier[] = [];

  constructor(base: number) {
    this.base = base;
  }

  get() {
    let value = this.base;
    this.modifiers.forEach((m) => {
      value += m.addition;
      value *= m.multiplier;
    });

    return value;
  }

  getBase() {
    return this.base;
  }

  addModifier(modifier: StatModifier) {
    this.modifiers.push(modifier);
    modifier.setStat(this);
  }

  removeModifier(modifier: StatModifier) {
    this.modifiers = this.modifiers.filter((m) => m != modifier);
  }

  update(delta: number) {
    this.modifiers.forEach((m) => m.update(delta));
  }
}
