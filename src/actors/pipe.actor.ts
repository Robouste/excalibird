import { Actor, Color, vec, Vector } from "excalibur";

export class Pipe extends Actor {
  constructor(pos: Vector, public type: "top" | "bottom") {
    super({
      pos,
      width: 32,
      height: 1000,
      anchor: type === "bottom" ? vec(0, 0) : vec(0, 1),
      color: Color.Green,
      vel: vec(-200, 0),
      z: -1,
    });

    this.on("exitviewport", () => this.kill());
  }
}
