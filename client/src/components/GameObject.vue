<template> </template>

<script>
import { Sprite, Graphics } from "pixi.js";
export default {
  props: {
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
    speed: {
      type: Number,
    },
  },
  inject: ["app"],
  data() {
    const graphics = new Graphics();
    graphics.lineStyle(3, 0xffffff, 1);
    graphics.beginFill(0, 0);
    graphics.drawRect(0, 0, 50, 100);
    graphics.endFill();

    return {
      sprite: graphics,
    };
  },
  watch: {
    x(value) {
      this.sprite.x = value;
    },
    y(value) {
      this.sprite.y = value;
    },
  },
  mounted() {
    this.app.stage.addChild(this.sprite);
  },
};
</script>
