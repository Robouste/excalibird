import { Actor, vec, Vector } from "excalibur";
import { Config } from "../config";
import { Resources } from "../resources";
import { Level } from "../scenes/level.scene";

export class ScoreTrigger extends Actor {
  constructor(pos: Vector, private _level: Level) {
    super({
      pos,
      width: 32,
      height: Config.PipeGap,
      anchor: vec(0, 0),
      vel: vec(-Config.PipeSpeed, 0),
    });

    this.on("exitviewport", () => this.kill());
  }

  public override onCollisionStart(): void {
    this._level.incrementScore();
    Resources.ScoreSound.play();
    this.kill();
  }
}
