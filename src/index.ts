import Phaser from "phaser";
import KeyboardScene from "./Scenes/KeyboardScene";


new Phaser.Game({
    parent: "game-root",
    type: Phaser.AUTO,
    width: 256,
    height: 64,
    scene: [KeyboardScene],
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    input: {
        activePointers: 5,
    },
    render: {
        transparent: true
    }
});

