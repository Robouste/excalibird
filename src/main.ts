import { Color, DisplayMode, Engine, Loader } from "excalibur";
import { Resources } from "./resources";
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

const loader = new Loader(Object.values(Resources));

game.start(loader).then(() => {
  game.goToScene("Level");
});
