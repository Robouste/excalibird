import { Random, Timer, vec } from "excalibur";
import { Pipe } from "../actors/pipe.actor";
import { ScoreTrigger } from "../actors/score-trigger.actor";
import { Config } from "../config";
import { Level } from "../scenes/level.scene";

export class PipeFactory {
  private _timer: Timer;

  constructor(
    private _level: Level,
    private _random: Random,
    intervalMs: number
  ) {
    this._timer = new Timer({
      interval: intervalMs,
      repeats: true,
      action: () => this.spawnPipes(),
    });

    this._level.add(this._timer);
  }

  public spawnPipes(): void {
    const randomPipePosition = this._random.floating(
      0,
      this._level.engine.screen.resolution.height - Config.PipeGap
    );

    const bottomPipe = new Pipe(
      vec(
        this._level.engine.screen.drawWidth,
        randomPipePosition + Config.PipeGap
      ),
      "bottom"
    );
    this._level.add(bottomPipe);

    const topPipe = new Pipe(
      vec(this._level.engine.screen.drawWidth, randomPipePosition),
      "top"
    );
    this._level.add(topPipe);

    const scoreTrigger = new ScoreTrigger(
      vec(this._level.engine.screen.drawWidth, randomPipePosition),
      this._level
    );
    this._level.add(scoreTrigger);
  }

  public start(): void {
    this._timer.start();
  }

  public reset(): void {
    for (const actor of this._level.actors) {
      if (actor instanceof Pipe || actor instanceof ScoreTrigger) {
        actor.kill();
      }
    }
  }

  public stop(): void {
    this._timer.stop();

    for (const actor of this._level.actors) {
      if (actor instanceof Pipe || actor instanceof ScoreTrigger) {
        actor.vel = vec(0, 0);
      }
    }
  }
}
