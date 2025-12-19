import { Actor, clamp, Collider, Color, Engine, Keys, vec } from "excalibur";
import { Config } from "../config";
import { Level } from "../scenes/level.scene";
import { Ground } from "./ground.actor";
import { Pipe } from "./pipe.actor";

export class Bird extends Actor {
  private _isJumping = false;
  private _isPlaying = false;

  constructor(private _level: Level) {
    super({
      pos: Config.BirdStartPos,
      radius: 8,
      color: Color.Yellow,
    });
  }

  public override onInitialize(): void {
    this.on("exitviewport", () => this._level.triggerGameOver());
  }

  public override onCollisionStart(_self: Collider, other: Collider): void {
    if (other.owner instanceof Ground || other.owner instanceof Pipe) {
      this._level.triggerGameOver();
    }
  }

  public override onPostUpdate(engine: Engine, elapsed: number): void {
    if (!this._isPlaying) {
      return;
    }

    if (!this._isJumping && this._isInputActive(engine)) {
      this.vel.y += Config.BirdJumpVelocity;
      this._isJumping = true;
    }

    if (!this._isInputActive(engine)) {
      this._isJumping = false;
    }

    this.vel.y = clamp(
      this.vel.y,
      Config.BirdMinVelocity,
      Config.BirdMaxVelocity
    );

    this.rotation = vec(Config.PipeSpeed, this.vel.y).toAngle();
  }

  public start(): void {
    this._isPlaying = true;
    this.pos = Config.BirdStartPos;
    this.acc = vec(0, Config.BirdAcceleration);
  }

  public reset(): void {
    this.pos = Config.BirdStartPos;
    this.stop();
  }

  public stop(): void {
    this._isPlaying = false;
    this.vel = vec(0, 0);
    this.acc = vec(0, 0);
  }

  private _isInputActive(engine: Engine): boolean {
    return (
      engine.input.keyboard.isHeld(Keys.Space) ||
      engine.input.pointers.isDown(0)
    );
  }
}
