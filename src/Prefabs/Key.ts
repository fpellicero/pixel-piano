import Phaser from "phaser";
import { noteOnEvent, noteOffEvent, Events } from "./SoundPlayer";


const getPressedTexture = (keyType: string) => keyType === "main" ? "key-pressed" : "high-key-pressed";
const getUnpressedTexture = (keyType: string) => keyType === "main" ? "key-unpressed" : "high-key-unpressed";
export default abstract class Key extends Phaser.GameObjects.Sprite {

  static Preload(scene: Phaser.Scene) {
    scene.load.image("key-unpressed", "assets/keyboard-key-unpressed.png");
    scene.load.image("key-pressed", "assets/keyboard-key-pressed.png")
    scene.load.image("high-key-unpressed", "assets/keyboard-high-key-unpressed.png");
    scene.load.image("high-key-pressed", "assets/keyboard-high-key-pressed.png");
  }

  private isPressed = false;
  constructor(scene: Phaser.Scene, x: number, y: number, private keyType: "main" | "high", public note: string) {
    super(scene, x, y, getUnpressedTexture(keyType));

    scene.add.existing(this);
    this.setInteractive();

    this.on("pointerdown", this.pointerDown);
    this.on("pointermove", this.pointerMove)
    this.on("pointerup", this.keyup);
    this.on("pointerout", this.keyup);

    window.addEventListener(Events.NOTE_ON, this.noteOn);
    window.addEventListener(Events.NOTE_OFF, this.noteOff)
  }

  private noteOn = (e: CustomEvent<string>) => {
    if (e.detail !== this.note) return;

    this.isPressed = true;
    this.setTexture(getPressedTexture(this.keyType));
  }

  private noteOff = (e: CustomEvent<string>) => {
    if(e.detail !== this.note) return;

    this.isPressed = false;
    this.setTexture(getUnpressedTexture(this.keyType))
  }

  public pointerDown = () => {
    noteOnEvent(this.note);
  }

  public keyup = () => {
    if (!this.isPressed) return;
    noteOffEvent(this.note);
  }

  private pointerMove = (pointer: Phaser.Input.Pointer) => {
    if (!this.isPressed && pointer.isDown) {
      this.pointerDown();
    }
  }
}