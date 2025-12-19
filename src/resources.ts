import { ImageSource, ImageWrapping } from "excalibur";

export const Resources = {
  BirdImage: new ImageSource("./images/bird.png"),
  PipeImage: new ImageSource("./images/pipe.png", {
    wrapping: ImageWrapping.Clamp,
  }),
  GroundImage: new ImageSource("./images/ground.png", {
    wrapping: ImageWrapping.Repeat,
  }),
} as const;
