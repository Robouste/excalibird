import { ImageSource, ImageWrapping } from "excalibur";

export const Resources = {
  BirdImage: new ImageSource("./images/bird.png"),
  PipeImage: new ImageSource("./images/pipe.png", {
    wrapping: ImageWrapping.Clamp,
  }),
} as const;
