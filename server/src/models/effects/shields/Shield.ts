import ShieldComponent from "../../../components/ShieldComponent";
import GameObject from "../../../entities/GameObject";

export default class Shield {
  private shieldComponent: ShieldComponent;
  public source: GameObject;

  private duration: number | null = null;
  private currentDuration: number | null = null;

  private shield: number;
  public currentShield: number;

  constructor(
    shieldComponent: ShieldComponent,
    source: GameObject,
    shield: number,
    duration: number = 0
  ) {
    this.shieldComponent = shieldComponent;
    this.source = source;

    this.shield = this.currentShield = shield;
    this.duration = this.currentDuration = duration;
  }

  onDamage(damage: number) {
    this.currentShield -= damage;
    if (this.currentShield <= 0) {
      this.shieldComponent.removeShield(this);
      //Return remaining damage
      return Math.abs(this.currentShield);
    }

    //No remaining damage if shield is big enough
    return 0;
  }

  addShield(shield: number) {
    this.currentShield += shield;
    this.shield += shield;
  }

  resetDuration() {
    this.currentDuration = this.duration;
  }

  update(delta: number) {
    if (this.duration != null && this.currentDuration != null) {
      this.currentDuration -= delta;

      if (this.currentDuration <= 0) {
        this.shieldComponent.removeShield(this);
      }
    }
  }
}
