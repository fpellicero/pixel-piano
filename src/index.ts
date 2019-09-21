import Phaser from "phaser";
import MainMenu from "./Scenes/Menus/MainMenuScene";


new Phaser.Game({
    parent: "game-root",
    type: Phaser.AUTO,
    width: 384 * 2,
    height: 640 * 2,
    scene: [
        MainMenu
    ],
    physics: {
        default: "arcade",
        arcade: {
            debug: process.env.NODE_ENV !== "production",
        }
    },
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
});

