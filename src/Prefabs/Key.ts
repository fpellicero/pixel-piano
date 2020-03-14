import Phaser from "phaser";
import Tone from "tone";


const getPressedTexture = (keyType: string) => keyType === "main" ? "key-pressed" : "high-key-pressed";
const getUnpressedTexture = (keyType: string) => keyType === "main" ? "key-unpressed" : "high-key-unpressed";
const Synth = new Tone.PolySynth(4, Tone.Synth).toMaster();
export default abstract class Key extends Phaser.GameObjects.Sprite {

  static Preload(scene: Phaser.Scene) {
    scene.load.image("key-unpressed", "assets/keyboard-key-unpressed.png");
    scene.load.image("key-pressed", "assets/keyboard-key-pressed.png")
    scene.load.image("high-key-unpressed", "assets/keyboard-high-key-unpressed.png");
    scene.load.image("high-key-pressed", "assets/keyboard-high-key-pressed.png");
  }

  private isPressed = false;
  constructor(scene: Phaser.Scene, x: number, y: number, private keyType: "main" | "high", private note: string) {
    super(scene, x, y, getUnpressedTexture(keyType));

    

    scene.add.existing(this);
    this.setInteractive();

    this.on("pointerdown", this.keyPress);
    this.on("pointermove", this.pointerMove)
    this.on("pointerup", this.keyup);
    this.on("pointerout", this.keyup);
  }

  private keyPress = () => {
    this.isPressed = true;
    
    this.setTexture(getPressedTexture(this.keyType));
    Synth.triggerAttack(this.note);
  }

  private keyup = () => {
    this.isPressed = false;

    this.setTexture(getUnpressedTexture(this.keyType));
    Synth.triggerRelease(this.note);
  }

  private pointerMove = (pointer: Phaser.Input.Pointer) => {
    if (!this.isPressed && pointer.isDown) {
      this.keyPress();
    }
  }
}