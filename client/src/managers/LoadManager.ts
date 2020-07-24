import { Loader } from "pixi.js";
import WebFont from "webfontloader";

export default class LoadManager {
  private loader: Loader;
  constructor() {
    this.loader = new Loader();
  }

  async load() {
    await Promise.all([this.loadPixi(), this.loadFonts()]);
  }

  async loadPixi() {
    return new Promise((resolve, reject) => {
      this.loader.load(() => {
        resolve();
      });
    });
  }

  async loadFonts() {
    return new Promise((resolve, reject) => {
      WebFont.load({
        active() {
          resolve();
        },
        google: {
          families: ["VT323"],
        },
      });
    });
  }
}
