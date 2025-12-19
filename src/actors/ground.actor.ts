import { Actor, Color, Engine, vec, Vector } from "excalibur";
import { Config } from "../config";
import { Resources } from "../resources";

export class Ground extends Actor {
  public moving = false;

  private _sprite = Resources.GroundImage.toSprite();

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

  public override onInitialize(engine: Engine): void {
    this._sprite.sourceView.width = engine.screen.drawWidth;
    this._sprite.destSize.width = engine.screen.drawWidth;
    this.graphics.use(this._sprite);
  }

  public override onPostUpdate(engine: Engine, elapsed: number): void {
    if (!this.moving) {
      return;
    }

    this._sprite.sourceView.x += Config.PipeSpeed * (elapsed / 1000);
    this._sprite.sourceView.x =
      this._sprite.sourceView.x % Resources.GroundImage.width;
  }

  public start(): void {
    this.moving = true;
  }

  public stop(): void {
    this.moving = false;
  }
}
