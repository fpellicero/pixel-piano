import Phaser from "phaser";
import BaseRectangle from "./BaseRectangle";

export default class RectangleBlue extends BaseRectangle {
    private static assetKey = "rectangle-blue";
    public static Preload(scene: Phaser.Scene) {
        scene.load.image(RectangleBlue.assetKey, "assets/png/element_blue_rectangle.png");
    }

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, RectangleBlue.assetKey);
    }
}