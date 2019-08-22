import Phaser from "phaser";
import BaseRectangle from "./BaseRectangle";

export default class RectanglePurple extends BaseRectangle {
    private static assetKey = "rectangle-purple";
    public static Preload(scene: Phaser.Scene) {
        scene.load.image(RectanglePurple.assetKey, "assets/png/element_purple_rectangle.png");
    }

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, RectanglePurple.assetKey);
    }
}