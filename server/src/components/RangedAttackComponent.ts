import AttackComponent from "./AttackComponent";
import GameObject from "../entities/GameObject";
import GameManager from "../managers/GameManager";
import AutoAttack from "../entities/AutoAttack";

export default class RangedAttackComponent extends AttackComponent {
  attack(go: GameObject) {
    const autoAttack = new AutoAttack(this.gameObject, go, this.damage);

    autoAttack.spawn();
  }
}
