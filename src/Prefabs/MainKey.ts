import Phaser from "phaser";
import Key from "./Key";

export default class MainKey extends Key {
  constructor(scene: Phaser.Scene, x: number, y: number, note: string) {
    super(scene, x, y, "main", note);

    scene.make.text({
      x: x - 2,
      y: y + 8,
      text: note.slice(0, 1),
      style: {
        font: "8px monospace",
        fill: "#000"
      }
    })
  }

  
}