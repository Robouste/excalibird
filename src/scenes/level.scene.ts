import {
  Color,
  Engine,
  Font,
  Label,
  Random,
  Scene,
  TextAlign,
  vec,
} from "excalibur";
import { Bird } from "../actors/bird.actor";
import { Ground } from "../actors/ground.actor";
import { Config } from "../config";
import { PipeFactory } from "../factories/pipe.factory";

export class Level extends Scene {
  public bird = new Bird(this);
  public ground!: Ground;
  public random = new Random();
  public pipeFactory = new PipeFactory(this, this.random, Config.PipeInterval);
  public score = 0;
  public best = 0;
  public scoreLabel = new Label({
    text: "Score: 0",
    x: 0,
    y: 0,
    z: 1,
    font: new Font({
      size: 20,
      color: Color.White,
    }),
  });
  public bestLabel = new Label({
    text: "Best: 0",
    x: 400,
    y: 0,
    z: 1,
    font: new Font({
      size: 20,
      color: Color.White,
      textAlign: TextAlign.Right,
    }),
  });
  public startGameLabel = new Label({
    text: "Tap to Start",
    x: 200,
    y: 200,
    z: 2,
    font: new Font({
      size: 30,
      color: Color.White,
      textAlign: TextAlign.Center,
    }),
  });

  public override onInitialize(engine: Engine): void {
    this.add(this.bird);

    this.ground = new Ground(
      vec(0, engine.screen.drawHeight - Config.GroundHeight)
    );
    this.add(this.ground);

    this._showStartInstructions();

    this.add(this.scoreLabel);
    this.add(this.bestLabel);
    this.add(this.startGameLabel);

    const bestScore = localStorage.getItem("bestScore");

    if (bestScore) {
      this.best = +bestScore;
      this._setBestScore(this.best);
    } else {
      this._setBestScore(0);
    }
  }

  public incrementScore(): void {
    this.scoreLabel.text = `Score: ${++this.score}`;
    this._setBestScore(this.score);
  }

  public triggerGameOver(): void {
    this.pipeFactory.stop();
    this.bird.stop();
    this.ground.stop();
    this._showStartInstructions();
  }

  public reset(): void {
    this.bird.reset();
    this.pipeFactory.reset();
    this.score = 0;
    this.scoreLabel.text = `Score: ${this.score}`;
  }

  private _showStartInstructions(): void {
    this.startGameLabel.graphics.isVisible = true;
    this.engine.input.pointers.once("down", () => {
      this.reset();

      this.startGameLabel.graphics.isVisible = false;
      this.pipeFactory.start();
      this.ground.start();
      this.bird.start();
    });
  }

  private _setBestScore(score: number): void {
    if (score > this.best) {
      localStorage.setItem("bestScore", score.toString());
      this.best = score;
    }

    this.bestLabel.text = `Best: ${this.best}`;
  }
}
