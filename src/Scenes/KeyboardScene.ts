import Phaser from "phaser";
import withProgressBar from "../Enhancers/withProgressBar";
import Key from "../Prefabs/Key";
import MainKey from "../Prefabs/MainKey";
import HighKey from "../Prefabs/HighKey";
import Config from "../game.config";

@withProgressBar
export default class KeyboardScene extends Phaser.Scene {
  public static key = "keyboard-scene";

  public preload() {
    this.load.image("frame", "assets/keyboard-frame.png");
    Key.Preload(this);
  }

  private _mainKeys = [
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

  private _highKeys = [
    "C#3",
    "D#3",
    "",
    "F#3",
    "G#3",
    "A#3",
    "",
    "C#4",
    "D#4",
    "",
    "F#4",
    "G#4",
    "A#4",
    "",
    "C#5",
    "D#5",
    "",
    "F#5",
    "G#5",
    "A#5"
  ]

  public create() {
    this.cameras.main.setBackgroundColor()
    // Add keyboard frame
    const keyboard = this.add.sprite(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "frame"
    );
    keyboard.scale = Config.SCALE;

    // Add main keys
    const scene = this;
    this._mainKeys.forEach(function(key, i) {
      new MainKey(
        scene, 
        18 * Config.SCALE + i * 11 * Config.SCALE, 
        44 * Config.SCALE, 
        key
      );
    });

    // Add high keys
    this._highKeys.forEach((key, i) => {
      if (!key) return;
      
      new HighKey(
        scene,
        23 * Config.SCALE + i * 11 * Config.SCALE,
        39 * Config.SCALE,
        key
      );
    })
  }
}
