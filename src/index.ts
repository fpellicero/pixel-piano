import Phaser from "phaser";
import KeyboardScene from "./Scenes/KeyboardScene";
import Config from "./game.config";


new Phaser.Game({
    parent: "game-root",
    type: Phaser.AUTO,
    width: 256 * Config.SCALE,
    height: 64 * Config.SCALE,
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

