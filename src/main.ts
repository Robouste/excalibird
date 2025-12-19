import { Color, DisplayMode, Engine } from "excalibur";
import { Level } from "./scenes/level.scene";

const game = new Engine({
  width: 400,
  height: 500,
  backgroundColor: Color.fromHex("#54C0CA"),
  pixelArt: true,
  pixelRatio: 2,
  displayMode: DisplayMode.FitScreen,
  scenes: {
    Level: Level,
  },
});

game.start().then(() => {
  game.goToScene("Level");
});
