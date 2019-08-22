import Phaser from "phaser";
import BaseRectangle from "./BaseRectangle";

export default class RectangleYellow extends BaseRectangle {
    private static assetKey = "rectangle-yellow";
    public static Preload(scene: Phaser.Scene) {
        scene.load.image(RectangleYellow.assetKey, "assets/png/element_yellow_rectangle.png");
    }

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, RectangleYellow.assetKey);
    }
}