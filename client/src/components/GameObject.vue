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
    graphics.drawRect(-25, -75, 50, 75);
    graphics.endFill();

    return {
      sprite: graphics,
    };
  },
  watch: {
    x: {
      handler(value) {
        this.sprite.x = value;
      },
      immediate: true,
    },
    y: {
      handler(value) {
        this.sprite.y = value;
      },
      immediate: true,
    },
  },
  mounted() {
    this.app.stage.addChild(this.sprite);
  },
  beforeUnmount() {
    this.sprite.destroy();
  },
};
</script>
