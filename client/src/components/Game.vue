<template>
  <Renderer @appMounted="onAppMounted">
    <GameObject v-for="go in gameObjects" :key="go.id" v-bind="go" />
  </Renderer>
</template>

<script>
import Renderer from "./Renderer.vue";
import GameObject from "./GameObject.vue";

import GameManager from "../managers/GameManager";

export default {
  components: {
    Renderer,
    GameObject,
  },
  data() {
    new GameManager();

    GameManager.instance.networkManager.on("STATE", (data) =>
      this.onState(data)
    );

    return {
      gameObjects: [],
    };
  },
  methods: {
    onState(data) {
      this.gameObjects = data.gameObjects;
    },
    onAppMounted(app) {
      GameManager.instance.onAppMounted(app);
    },
  },
};
</script>
