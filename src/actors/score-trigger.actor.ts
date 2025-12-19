import { Actor, Collider, vec, Vector } from "excalibur";
import { Config } from "../config";
import { Resources } from "../resources";
import { Level } from "../scenes/level.scene";
import { Bird } from "./bird.actor";

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

  public override onCollisionStart(_self: Collider, other: Collider): void {
    if (other.owner instanceof Bird) {
      this._level.incrementScore();
      Resources.ScoreSound.play();
      this.kill();
    }
  }
}
