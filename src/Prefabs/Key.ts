import Phaser from "phaser";
import Tone from "tone";

export default class Key extends Phaser.GameObjects.Sprite {

  static Preload(scene: Phaser.Scene) {
    scene.load.image("key-unpressed", "assets/keyboard-key-unpressed.png");
    scene.load.image("key-pressed", "assets/keyboard-key-pressed.png")
  }

  private isPressed = false;
  private _synth = new Tone.Synth().toMaster();
  constructor(scene: Phaser.Scene, x: number, y: number, private note: string) {
    super(scene, x, y, "key-unpressed");

    scene.add.existing(this);
    this.setInteractive();

    this.on("pointerdown", this.keyPress);
    this.on("pointermove", this.pointerMove)
    this.on("pointerup", this.keyup);
    this.on("pointerout", this.keyup);
  }

  private keyPress = () => {
    this.isPressed = true;
    
    this.setTexture("key-pressed");
    this._synth.triggerAttack(this.note, '+0.05');
  }

  private keyup = () => {
    this.isPressed = false;

    this.setTexture("key-unpressed");
    this._synth.triggerRelease();
  }

  private pointerMove = (pointer: Phaser.Input.Pointer) => {
    if (!this.isPressed && pointer.isDown) {
      this.keyPress();
    }
  }
}