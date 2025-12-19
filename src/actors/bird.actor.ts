import {
  Actor,
  Animation,
  AnimationStrategy,
  clamp,
  Collider,
  Color,
  Engine,
  Keys,
  Sprite,
  SpriteSheet,
  vec,
} from "excalibur";
import { Config } from "../config";
import { Resources } from "../resources";
import { Level } from "../scenes/level.scene";
import { Ground } from "./ground.actor";
import { Pipe } from "./pipe.actor";

export class Bird extends Actor {
  private _isJumping = false;
  private _isPlaying = false;
  private _upAnimation!: Animation;
  private _downAnimation!: Animation;
  private _startSprite!: Sprite;

  constructor(private _level: Level) {
    super({
      pos: Config.BirdStartPos,
      radius: 8,
      color: Color.Yellow,
    });
  }

  public override onInitialize(): void {
    const spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.BirdImage,
      grid: {
        rows: 1,
        columns: 4,
        spriteWidth: 32,
        spriteHeight: 32,
      },
    });

    this._upAnimation = Animation.fromSpriteSheet(
      spriteSheet,
      [2, 1, 0], // 3rd frame, then 2nd, then first
      150, // 150ms for each frame
      AnimationStrategy.Freeze
    );

    this._downAnimation = Animation.fromSpriteSheet(
      spriteSheet,
      [0, 1, 2],
      150,
      AnimationStrategy.Freeze
    );

    this._startSprite = spriteSheet.getSprite(1, 0);

    // Register animations
    this.graphics.add("down", this._downAnimation);
    this.graphics.add("up", this._upAnimation);
    this.graphics.add("start", this._startSprite);

    this.graphics.use("start");

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

      this.graphics.use("up");
      this._upAnimation.reset();
      this._downAnimation.reset();
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

    if (this.vel.y > 0) {
      this.graphics.use("down");
    }
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
