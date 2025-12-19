import { Actor, Color, vec, Vector } from "excalibur";
import { Config } from "../config";

export class Ground extends Actor {
  public moving = false;

  constructor(pos: Vector) {
    super({
      pos,
      anchor: vec(0, 0),
      height: Config.GroundHeight,
      width: 400,
      color: Color.fromHex("#bd9853"),
      z: 1,
    });
  }

  public start(): void {
    this.moving = true;
  }

  public stop(): void {
    this.moving = false;
  }
}
