import Phaser from "phaser";
import withProgressBar from "../Enhancers/withProgressBar";
import Key from "../Prefabs/Key";

@withProgressBar
export default class KeyboardScene extends Phaser.Scene {
  public static key = "keyboard-scene";

  public preload() {
    this.load.image("frame", "assets/keyboard-frame.png");
    Key.Preload(this);
  }

  private keys = [
    "C3",
    "D3",
    "E3",
    "F3",
    "G3",
    "A3",
    "B3",
    "C4",
    "D4",
    "E4",
    "F4",
    "G4",
    "A4",
    "B4",
    "C5",
    "D5",
    "E5",
    "F5",
    "G5",
    "A5",
    "B5",
  ];

  public create() {
    this.cameras.main.setBackgroundColor()
    // Add keyboard frame
    this.add.sprite(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "frame"
    );

    // Add keys
    const scene = this;
    this.keys.forEach(function(key, i) {
      new Key(scene, 18 + i * 11, 44, key);
    });
  }
}
