import Phaser from "phaser";
import withProgressBar from "../Enhancers/withProgressBar";
import Key from "../Prefabs/Key";
import MainKey from "../Prefabs/MainKey";
import HighKey from "../Prefabs/HighKey";
import SoundPlayer from "../Prefabs/SoundPlayer";

enum Assets {
  KEYBOARD_FRAME = "keyboard-frame",
  REC_BUTTON_PRESSED = "rec-button-pressed",
  REC_BUTTON_UNPRESSED = "rec-button-unpressed",
  RED_PILOT_OFF = "red-pilot-off",
  RED_PILOT_ON = "red-pilot-on",
  PLAY_ICON = "play-icon",
  DELETE_ICON = "delete-icon"
}

@withProgressBar
export default class KeyboardScene extends Phaser.Scene {
  public static key = "keyboard-scene";

  public preload() {

    Object.values(Assets).forEach((value) => {
      this.load.image(value, `assets/${value}.png`);
    });
    
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

  private Keys: Key[] = [];
  private SoundPlayer = new SoundPlayer();
  public create() {
    this.cameras.main.setBackgroundColor()
    // Add keyboard frame
    const keyboard = this.add.sprite(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      Assets.KEYBOARD_FRAME
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

    this.makeRecButton();
    this.createRecordingList();
    


    // setTimeout(() => {
    //   this.play(ToZanarkand);
    // }, 1000);
  }

  private makeRecButton() {
    // Add REC button
    const recButton = this.add.sprite(227, 52, Assets.REC_BUTTON_UNPRESSED);

    // Add rec light
    const recLight = this.add.image(120, 30, Assets.RED_PILOT_OFF)

    recButton.setInteractive()

    let isRecording = false;
    
    recButton.on("pointerdown", () => {
      if (isRecording) {
        this.SoundPlayer.StopRecording();
        recButton.setTexture(Assets.REC_BUTTON_UNPRESSED);
        recLight.setTexture(Assets.RED_PILOT_OFF);
        this.createRecordingList();
      } else {
        this.SoundPlayer.StartRecording();
        recButton.setTexture(Assets.REC_BUTTON_PRESSED);
        recLight.setTexture(Assets.RED_PILOT_ON);
      }
      isRecording = !isRecording;
    });

    
  }

  private recordingList: Phaser.GameObjects.Group;
  private createRecordingList() {
    if (!this.recordingList) {
      this.recordingList = this.add.group();
    }

    this.recordingList.clear(true, true);
    
    const recordings = this.SoundPlayer.GetRecordings();
    
    const scene = this;

    const startX = 330;
    const columnWidth = 70;
    const itemsPerColumn = 4;
    recordings.forEach(({name, song}, i) => {
      const x = startX + Math.floor(i / itemsPerColumn) * columnWidth;
      const playButton = scene.add.sprite(
        x, 
        27 + 8 * (i % itemsPerColumn), 
        Assets.PLAY_ICON
      );
      playButton.setInteractive();

      playButton.on("pointerdown", () => scene.SoundPlayer.Play(song))

      const deleteButton = scene.add.image(
        x + 7,
        27 + 8 * (i % itemsPerColumn),
        Assets.DELETE_ICON
      );
      deleteButton.setInteractive();

      deleteButton.on("pointerdown", function() {
        scene.SoundPlayer.Delete(name);
        scene.createRecordingList();
      })

      const label = scene.add.text(
        x + 15, 
        24 + 8 * (i % itemsPerColumn), 
        name, 
        {font: "6px monospace", fill: "#FFF"}
      );

      this.recordingList.add(playButton);
      this.recordingList.add(deleteButton);
      this.recordingList.add(label);
    })
  }
}
