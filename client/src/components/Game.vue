<template>
  <div class="app-container"></div>
</template>

<script>
import GameManager from "../managers/GameManager";

export default {
  mounted() {
    GameManager.init(this.$el);
  },
  beforeUnmount() {
    GameManager.stop();
  },
};
</script>
