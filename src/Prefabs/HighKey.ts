import Phaser from "phaser";
import Key from "./Key";

export default class HighKey extends Key {
  constructor(scene: Phaser.Scene, x: number, y: number, note: string) {
    super(scene, x, y, "high", note);
  }
}