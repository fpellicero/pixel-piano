import Phaser from "phaser";
import GameScene from "./Scenes/GameScene";

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 384 * 2,
    height: 640 * 2,
    scene: [GameScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
        }
    },
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
});

