import Phaser from "phaser";
import withProgressBar from "../Enhancers/withProgressBar";
import Key from "../Prefabs/Key";
import MainKey from "../Prefabs/MainKey";
import HighKey from "../Prefabs/HighKey";
import ToZanarkand from "../Songs/ToZanarkand";

@withProgressBar
export default class KeyboardScene extends Phaser.Scene {
  public static key = "keyboard-scene";

  public preload() {
    this.load.image("frame", "assets/keyboard-frame.png");
    Key.Preload(this);
  }

  public play(song: Song) {
    if (song.length === 0) return;
    
    const {key, duration} = song.slice(0, 1)[0];

    const currentKey = this.Keys.find(k => k.note === key);

    currentKey.keyPress();

    setTimeout(() => {
      currentKey.keyup();
      this.play(song.slice(1));
    }, duration);
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

  private Keys: Key[] = [];
  public create() {
    this.cameras.main.setBackgroundColor()
    // Add keyboard frame
    const keyboard = this.add.sprite(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "frame"
    );

    // Add main keys
    const scene = this;
    this._mainKeys.forEach(function(key, i) {
      scene.Keys.push(new MainKey(
        scene, 
        36 + i * 22, 
        88, 
        key
      ));
    });

    // Add high keys
    this._highKeys.forEach(function (key, i) {
      if (!key) return;
      
      scene.Keys.push(new HighKey(
        scene,
        46 + i * 22,
        78,
        key
      ));
    })

    // setTimeout(() => {
    //   this.play(ToZanarkand);
    // }, 1000);
  }
}
