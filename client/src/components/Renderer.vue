<template>
  <div class="renderer">
    <slot></slot>
  </div>
</template>

<script>
import { Application } from "pixi.js";

export default {
  data() {
    const app = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    return {
      app,
    };
  },
  provide() {
    return {
      app: this.app,
    };
  },
  mounted() {
    this.$el.appendChild(this.app.view);

    window.addEventListener("resize", () =>
      this.app.renderer.resize(window.innerWidth, window.innerHeight)
    );

    this.$emit("appMounted", this.app);
  },
};
</script>

<style></style>
