import Phaser from "phaser";
import BaseRectangle from "./BaseRectangle";

export default class RectangleRed extends BaseRectangle {
    private static assetKey = "rectangle-red";
    public static Preload(scene: Phaser.Scene) {
        scene.load.image(RectangleRed.assetKey, "assets/png/element_red_rectangle.png");
    }

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, RectangleRed.assetKey);
    }
}