import { DisplayObject } from "pixi.js";

export default function setPivotCenter(sprite: DisplayObject) {
  var bounds = sprite.getBounds();
  sprite.pivot.set(bounds.width / 2, bounds.height / 2);
}
