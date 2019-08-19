import Phaser from "phaser";
import DefaultScene from "./Scenes/GameScene";

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 384 * 2,
    height: 640 * 2,
    scene: DefaultScene,
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

