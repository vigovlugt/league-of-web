import fetch from "node-fetch";

export default class DataManager {
  private ddragonBaseUrl: string;

  private version: string | null = null;

  private champions: any;

  constructor(ddragonBaseUrl = "https://ddragon.leagueoflegends.com/") {
    this.ddragonBaseUrl = ddragonBaseUrl;
  }

  async loadData() {
    await this.getVersion();
    await this.getChampionData();
  }

  async getVersion() {
    const res = await fetch(this.ddragonBaseUrl + "api/versions.json");
    const json = await res.json();
    this.version = json[0];
    console.log("LOADED DDRAGON DATA VERSION", this.version);
  }

  async getChampionData() {
    const res = await fetch(
      this.ddragonBaseUrl + `cdn/${this.version}/data/en_US/champion.json`
    );
    const json = await res.json();
    this.champions = json.data;
  }

  getChampionStats(champion: string) {
    return this.champions[champion].stats;
  }
}
