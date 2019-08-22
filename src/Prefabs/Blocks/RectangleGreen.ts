import Phaser from "phaser";
import BaseRectangle from "./BaseRectangle";

export default class RectangleGreen extends BaseRectangle {
    private static assetKey = "rectangle-green";
    public static Preload(scene: Phaser.Scene) {
        scene.load.image(RectangleGreen.assetKey, "assets/png/element_green_rectangle.png");
    }

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, RectangleGreen.assetKey);
    }
}